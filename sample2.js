let _ = require('lodash')
_.mixin(require("lodash-deep"))

let Promise = require('bluebird')
import { BaseController } from '@nightlife/nl-skeletor/src/base_controller'
import { SpotifyServiceContainer, SpotifyConfig } from '../spotify'
import { ISkelConfig } from '@nightlife/nl-skeletor/src/config'
let crypto = require('crypto')

export class SulController extends BaseController {

  service: SpotifyServiceContainer
  config: ISkelConfig & SpotifyConfig
  timeout: NodeJS.Timeout | null
  recheckAll: boolean
  stopRun: boolean
  logPrefix: string

  constructor(config: ISkelConfig & SpotifyConfig, service: SpotifyServiceContainer) {
    super(service, 'SulController', config)

    this.service = service
    this.recheckAll = false
    this.stopRun = false
    this.logPrefix = ''
    this.timeout = setTimeout(() => {
      this.nominateAndUpdateSul()
    }, this.config.sul_update_interval)

  }

  nominateAndUpdateSul() {
    this.fetchSul()
      .then((nominatedSul) => {
        if (nominatedSul === null) {
          console.info(this.logPrefix + 'No Lists need updating')
          this.recheckAll = false
          this.logPrefix = ''
          this.timeout = setTimeout(() => {
            this.nominateAndUpdateSul()
          }, this.config.sul_update_interval)
        }
        else {

          /*
          nominatedSul = [{
              sul_id: 'S600552609',
              name: 'Hot Hits Australia',
              description: 'Created by Spotify',
              sp_user_id: 'spotify',
              sp_playlist_id: '37i9dQZF1DWXXs9GFYnvLB',
              sp_key: 'MTY0MTc5NDI1NCwwMDAwMDMDAwMDAwMTdlNDI5MDM3ODYwMDAwMDE3ZTJkY1YWIx',
              status: 'b_active',
              created_at: '2017-05-09 20:05:38',
              updated_at: '2021-04-18 01:39:59'
          }]
*/
          return Promise.map(nominatedSul, (row) => {
            return this.updateSulInNLMSs(row)
          }, { concurrency: 4 })
            .then(() => {
              if (!this.stopRun)
                this.nominateAndUpdateSul()
              this.stopRun = false
            })
        }
      })
  }

  fetchSul() {
    console.info(this.logPrefix + '\n------------ called fetchSul()')
    var params: any = {}
    params.order = [['status', 'ASC'], 'updated_at']
    params.limit = 100

    return this.service.models.sul.findAndCount(params)
      .then((result) => {
        if (result.count === 0) {
          return null
        }
        else {
          let nowDateTime: any = new Date()

          let lists: Array<any> = _.filter(result.rows, (row) => {
            let prevUpdateInterval: any = nowDateTime - result.rows[0].updated_at
            return result.rows[0].status === 'a_immediate' || (prevUpdateInterval >= this.config.sul_min_interval)
          })

          if (lists.length > 0)
            return lists
          else
            return null
        }
      })
      .catch((err) => {
        this.log.error('??? Error in fetchSul >', err);
        return null
      });
  }

  //gets Spotify trakcs and returns Nightlife matches for those tracks by calling live server API endpoint
  getNlMatches(aSpIds) {
    if (this.service.rmqRpc !== undefined) {
      return Promise.resolve()
        .then(() => {
          var req: any = {
            verb: {
              event_category: 'request_songs',
              event: 'spotify_filenames'
            },
            object: {
              ids: aSpIds
            },
            target: {
              system: '',
            }
          }

          if (this.service.rmqRpc !== undefined) {
            return this.service.rmqRpc.sendRpc('nl-hdms.request', req, {}, { trace_id: this.service.uuid() })
          }
        })
        .catch((error) => {
          console.info(this.logPrefix + error)
        })
    }
    console.info(this.logPrefix + 'OUT')
  }

  updateSpUserList(aSystemId, aSul, aMatchedSongs) {
    if (this.service.rmqRpc !== undefined) {

      aMatchedSongs = _.filter(aMatchedSongs, (row) => { return row !== null })
      if (aMatchedSongs.length === 0)
        return Promise.resolve()

      return Promise.resolve()
        .then(() => {
          let compoundPlaylist = { name: aSul.sp_user_id, id: aSul.sp_playlist_id }
          let strcmpPlaylist = JSON.stringify(compoundPlaylist);
          let req: any = {
            verb: {
              event_category: 'request_system',
              event: 'set_list'
            },
            object: {
              list_name: aSul.sul_id,
              friendly_name: aSul.name,
              description: aSul.description,
              spotify_list_id: strcmpPlaylist,
              songs: aMatchedSongs

            },
            target: {
              system: aSystemId,
            }
          }

          if (this.service.rmqRpc !== undefined) {
            console.info(this.logPrefix + `*** Updating ${aSystemId} (${aSul.sul_id}) ***`)
            return this.service.rmqRpc.sendRpc('nl-hdms.request', req, {}, { trace_id: this.service.uuid() })
              .then((response: any) => {
                try {
                  console.info(this.logPrefix + JSON.stringify(response))
                }
                catch (error) { }
                // on an error save the message for later
                if (response.verb.event === 'error') {
                  this.saveMessage(aSystemId, aSul.sul_id, req)
                  console.warn(`Failed to update: ${aSul.sul_id}, on system ${aSystemId}`)
                }
                else
                  console.info(this.logPrefix + `List updated ${aSul.sul_id}, on system ${aSystemId}`)
              })
              .catch((error) => {
                // RPC time out save for later
                this.saveMessage(aSystemId, aSul.sul_id, req)
              })

          }
        })

    }
  }

  saveMessage(aSystemId: string, aListID: string, aMessage: string) {

    return Promise.resolve()
      .then(() => {

        let message: string = JSON.stringify(aMessage).replace(/'/g, '\\\'')
        let query: string = `INSERT INTO ${this.config.sequelize.database}.systems (system_id, list_id, message)
                                VALUES ('${aSystemId}', '${aListID}', '${message}')
                                ON DUPLICATE KEY UPDATE message = '${message}'`

        return this.service.sequelize.query(query)
      })
      .catch((error) => {
        this.log.error(error)
      })
  }

  generateHashSpCode(aNlAssets) {
    var hashCode = '0';
    try {
      aNlAssets = _.sortBy(aNlAssets, (aOneNlAsset) => { return aOneNlAsset; });
      var hash = crypto.createHash('sha1');
      _.forEach(aNlAssets, (aOneNlAsset) => {
        if (aOneNlAsset !== null)
          hash.update(aOneNlAsset, 'utf8');
      });
      hashCode = hash.digest('hex');
    }
    catch (err) {
      this.log.error('error in generateHashSpCode() fucntion >', err)
    }
    finally {

      return (hashCode);
    }
  }

  // This function update 'suls' table
  updateSulTable(aNominatedSul, aStatus, aHashCode) {

    if (!aNominatedSul)
      return Promise.resolve(null)

    return this.service.models.sul.upsert({
      sul_id: aNominatedSul.sul_id,

      name: aNominatedSul.name,
      description: aNominatedSul.description,
      sp_user_id: aNominatedSul.sp_user_id,
      sp_playlist_id: aNominatedSul.sp_playlist_id,
      sp_key: aHashCode,
      status: aStatus
    });
  }

  // This function updates 'sul_songs' table (delete and insert).
  updateSulSongsTable(aNominatedSul, arMatchedSongs) {
    console.info(this.logPrefix + `\n----- Number of matched songs: ${arMatchedSongs.length}`);
    return Promise.resolve()
      .then(() => {

        let query: string = `DELETE FROM ${this.config.sequelize.database}.sul_songs
                                WHERE sul_id = '${aNominatedSul}'`

        return this.service.sequelize.query(query)
      })
      .then((res) => {
        // unique results only
        arMatchedSongs = [...new Set(arMatchedSongs)]

        const queryValueString = arMatchedSongs.map(
          (song) => `('${aNominatedSul}, $'${song}', NOW(), NOW())`
        ).join(',')


        let query: string = `INSERT INTO ${this.config.sequelize.database}.sul_songs
                                        (sul_id, song_id)
                                        VALUES ${queryValueString}`

        return this.service.sequelize.query(query)
      })
      .catch((err) => { })
  }

  // This function updates 'sul_systems' table (delete and insert).
  updateSulSystemTable(aSulId, arSystems) {
    console.info(this.logPrefix + `\n----- Number of systems: ${arSystems.length}`);
    return this.service.sequelize.transaction((t) => {
      return this.service.models.sul_system.destroy({
        where: {
          sul_id: aSulId
        },
        transaction: t
      }).then((destroyed) => {
        return Promise.all(arSystems.map((aOneSystem) => {
          if (aOneSystem != null && aOneSystem.trim() !== '') {
            return this.service.models.sul_system.upsert({
              sul_id: aSulId,
              system_id: aOneSystem
            }, { transaction: t });
          }
        }));
      });
    });
  }

  updateSulInNLMSs(aNominatedSul) {
    console.info(this.logPrefix + 'called updateSulInNLMSs() for >>> ', aNominatedSul.sul_id);

    var hasCode = '';
    var prevHasCode = aNominatedSul.sp_key;
    var arMatchedSongs: any = null;
    var arSystems: any = null;

    var params: any = {};
    params.where = { sul_id: aNominatedSul.sul_id };
    return this.service.models.sul_system.findAndCount(params)
      .then((result) => {
        return result.rows;
      })
      .then((aSystems) => {
        if (aSystems !== null && aSystems.length > 0) {
          arSystems = aSystems;
          return this.service.controllers.spotifyApi.getPlaylistSnapshot(aNominatedSul.sp_playlist_id)
        }
        else {
          //return this.updateSulTable(aNominatedSul, -1)
          return this.updateSulTable(aNominatedSul, 'e_inactive', 0)
            .then(() => {
              throw (`${aNominatedSul.sp_playlist_id} is not installed in any systems`);
            });
        }
      })
      // check the snapshot ID matches, if not get the new playlist details
      .then((snapshotID: string | undefined) => {

        // there is no longer a playlist with this ID
        if (snapshotID === undefined) {
          return this.updateSulTable(aNominatedSul, 'e_inactive', 0)
            .then(() => {
              throw (`${aNominatedSul.sp_playlist_id} this playlist doesn't exist`)
            })
        }

        hasCode = snapshotID
        let params: any = { where: { sul_id: aNominatedSul.sul_id } }

        return this.service.models.sul.find(params)
          .then((result) => {

            if (result === undefined) {
              throw (`${aNominatedSul.sul_id}, internal error missing sul_id`)
            }

            if (!this.recheckAll && result.sp_key === snapshotID) {
              return this.updateSulTable(aNominatedSul, 'b_active', hasCode)
                .then(() => {

                  throw (`${aNominatedSul.sp_playlist_id} this playlist doesn't need updating`)
                })
            }

            return Promise.all([
              this.service.controllers.spotifyApi.getPlaylistTracks(aNominatedSul.sp_playlist_id),
              this.getSpotifyIDs(aNominatedSul.sp_playlist_id)
            ])
          })
      })
      .spread((spotifyResult, nightlifeResult) => {

        if (spotifyResult === undefined || spotifyResult.length === 0) {
          return this.updateSulTable(aNominatedSul, 'b_active', hasCode)
            .then(() => {
              throw (`${aNominatedSul.sp_playlist_id} doesn't have any songs`)
            })
        }

        // get the Spotify ids
        var spIds: Array<string> = []
        _.forEach(spotifyResult, (oneSpTrack: any) => {
          if (oneSpTrack.track)
            spIds.push(oneSpTrack.track.id)
        })
        // get Nightlife's Spotify ids
        let storedIDs: Array<string> = []
        if (nightlifeResult.length > 0 && nightlifeResult[0].length > 0) {
          storedIDs = JSON.parse(nightlifeResult[0][0].songs)
        }

        // compare the last result that was retrieved against the current result
        // the spotify has can change but the list stays the same
        // if the lengths are different, the rest of the test can be ignored
        if (!this.recheckAll && spIds.length === storedIDs.length && prevHasCode !== '0') {
          if (_.isEqual(_.sortBy(storedIDs), _.sortBy(spIds))) {
            return this.updateSulTable(aNominatedSul, aNominatedSul.status, aNominatedSul.sp_key)
              .then(() => {
                throw (`The list hasn't changed`)
              })
          }
        }

        // store the new results
        this.saveSpotifyList(aNominatedSul.sp_playlist_id, spIds)

        if (spIds.length === 0) {
          return this.updateSulTable(aNominatedSul, 'b_active', hasCode)
            .then(() => {
              throw (`${aNominatedSul.sp_playlist_id} doesn't have any songs`)
            })
        }

        return this.getNlMatches(spIds)
      })
      .then((res) => { // update suls table.  
        if (res && res.object) {
          arMatchedSongs = res.object.mapping
        }

        return this.updateSulTable(aNominatedSul, 'b_active', hasCode);
      })
      .then((res) => { // if Nightlife matched songs are changed then we update sul_songs (delete and insert).            
        if (this.recheckAll || (!(hasCode === prevHasCode) && arMatchedSongs !== null && arMatchedSongs.length > 0)) {
          return this.updateSulSongsTable(aNominatedSul, arMatchedSongs);
        }
        else {
          return this.updateSulTable(aNominatedSul, aNominatedSul.status, aNominatedSul.sp_key)
            .then(() => {
              throw (`\n----- Rejected: ${aNominatedSul.sul_id} - no change in spotify playlist detected`)
            })
        }
      })
      .then(() => {
        if (arSystems !== null) {
          console.info(this.logPrefix + '\n----- updating playlist in NLMSs started, number of systems :', arSystems.length)
          return Promise.map(arSystems, (aOneSystem) => {
            return this.updateSpUserList(aOneSystem.system_id, aNominatedSul, arMatchedSongs)
          }, { concurrency: 10 })
        }

      })
      .catch((err) => {

        if (err) {
          let isString: boolean = typeof err === 'string' || err instanceof String
          if (isString && err.includes("is not installed in any systems")) {
            return this.deleteNightlifeEntry(aNominatedSul.sul_id)
          }
          else if (!isString || (!err.includes("this playlist doesn't need updating") && !err.includes("doesn't have any songs") && !err.includes("this playlist doesn't exist") && !err.includes("The list hasn't changed")))
            this.log.error('Error >> ', err)
        }
      })
      .finally(() => {
        console.info(this.logPrefix + `----- updating process for: ${aNominatedSul.sul_id} completed`)
      })

  }

  deleteNightlifeEntry(nightlifeID: string) {
    return Promise.resolve()
      .then(() => {
        let query: string = `DELETE FROM ${this.config.sequelize.database}.suls
                                WHERE sul_id = '${nightlifeID}'`

        return this.service.sequelize.query(query)
      })
      .then(() => {
        let query: string = `DELETE FROM ${this.config.sequelize.database}.sul_songs
            WHERE sul_id = '${nightlifeID}'`

        return this.service.sequelize.query(query)
      })
      .then(() => {
        console.log(`Deleted entries for ${nightlifeID}, it's not used.`)
      })
      .catch((error) => {
        console.log(error)

      })
  }


  saveSpotifyList(sp_playlist_id: any, spotify_ids: any) {
    return Promise.resolve()
      .then(() => {
        let query: string = `REPLACE INTO ${this.config.sequelize.database}.songs 
                                (list_id, songs)
                                VALUES('${sp_playlist_id}', '${JSON.stringify(spotify_ids)}')`


        return this.service.sequelize.query(query)
      })
  }

  getSpotifyIDs(sp_playlist_id: any): any {

    return Promise.resolve()
      .then(() => {
        let query: string = `SELECT *
                                FROM ${this.config.sequelize.database}.songs
                                WHERE list_id = '${sp_playlist_id}'`

        return this.service.sequelize.query(query)
      })
  }


  generateListName(aSpotifyName) {
    var name = 'S';

    var sectionsLength = aSpotifyName.length / 3;
    var uid = 0;
    var multiplier = 1;

    var start = 0;
    var end = sectionsLength + (aSpotifyName.length % 3);
    var section = [];

    for (var i = 0; i < 3; ++i) {
      section = aSpotifyName.substring(start, end).split('');

      _.forEach(section, (aSection: any) => {
        uid += aSection.charCodeAt(0) * multiplier;
      });
      start = end;
      end += sectionsLength;
      multiplier *= 1000;

    }
    return name + (uid % 1000000000);
  }

  create(args, opts, cb) {
    var genUslId = '';
    if (!args.sp_playlist || !args.sp_user) {
      return cb('Invalid parametes');
    }
    this.service.controllers.spotifyApi.isUserValid(args.sp_user)
      .then((aIsUservalid) => {
        if (!aIsUservalid)
          throw ('Invalid sp_user');
      })
      .then((err) => {

        return this.service.controllers.spotifyApi.isPlaylistValid(args.sp_user, args.sp_playlist);
      })
      .then((aIsPlaylistValid) => {
        if (!aIsPlaylistValid)
          throw ('Invalid sp_playlist');
        else {
          var params: any = {};
          params.where = { sp_playlist_id: args.sp_playlist, sp_user_id: args.sp_user }
          params.limit = 5;
          return this.service.models.sul.findAndCount(params)
            .then((result) => {
              return (result.count > 0);
            });
        }
      })
      .then((aSulExist) => {
        if (!aSulExist) {
          genUslId = this.generateListName(args.sp_playlist);
          var description = 'Created by ' + args.sp_user;
          if (args.description) {
            description = args.description;
          }

          return this.service.models.sul.upsert({
            sul_id: genUslId,
            name: args.name,
            description: description,
            sp_user_id: args.sp_user,
            sp_playlist_id: args.sp_playlist
          });
        }
        else {
          throw ('The playlist already exists');
        }
      })
      .then(() => {
        return cb(null, { sul_id: genUslId, msg: 'A new SUL created successfully.' });
      })
      .catch((err) => {
        return cb(err);
      });
  }

  isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }

  get(args, opts, cb) {
    args.include = [{ model: 'sul_system' }, { model: 'sul_song' }];
    if (!args.where || this.isEmptyObject(args.where)) {
      cb('Should define a specific SUL (you need a where clause).');
    }
    this.find(this.service.models.sul, args, opts, cb)
  }

  install(args, opts, cb) {
    if (!args.sul_id || !args.system_id || args.sul_id.trim() === '' || args.system_id.length === 0) {
      return cb('Invalid parametes');
    }
    var sulId = args.sul_id.trim();
    var foundSul = null;
    var params: any = {};
    params.where = { sul_id: sulId };
    params.limit = 5;
    this.service.models.sul.findAndCount(params)
      .then((result) => {
        return result.rows;
      })
      .then((aSul) => {
        if (aSul !== null && aSul.length > 0) {
          foundSul = aSul[0];

          return this.updateSulSystemTable(sulId, args.system_id);
        }
        else {
          throw (`${sulId} does not exist.`);
        }
      })
      .then((res) => {
        return this.updateSulTable(foundSul, 'immediate', 0);
      })
      .then((res) => {
        return cb(null, { sul: foundSul, systems: args.system_id, msg: 'installed successfully' });
      })
      .catch((err) => {
        return cb(err);
      })
  }

  uninstall(args, opts, cb) {
    if (!args.sul_id || !args.system_id || args.sul_id.trim() === '' || args.system_id.length === 0) {
      return cb('Invalid parametes');
    }

    var foundSul: any = null;
    var foundSystems: any = [];
    var sulId = args.sul_id.trim();
    var params: any = {};
    params.where = { sul_id: sulId };


    return this.service.models.sul.findOne(params)
      .then((aSul) => {

        foundSul = aSul;
        if (foundSul === null || foundSul.sul_id !== sulId) {
          throw (`${sulId} does not exist.`);
        }
        return this.service.models.sul_system.findAndCount(params)
      })
      .then((aSystems) => {
        if (aSystems === null || aSystems.count === 0) {
          throw (`${sulId} is not installed in any system.`);
        }
        _.forEach(aSystems.rows, (aSystem) => {
          if (aSystem !== null)
            foundSystems.push(aSystem.system_id);
        });
        return Promise.all(args.system_id.map((aOneSystem) => {
          if ((aOneSystem !== null) && (aOneSystem.trim() !== '') && (foundSystems.indexOf(aOneSystem) >= 0)) {
            return this.uninstallSpUserListFromNLMS(aOneSystem, sulId);
          }
        }));
      })
      .then(() => {
        return this.service.models.sul_system.destroy({
          where: {
            sul_id: sulId,
            system_id: { $in: args.system_id }
          }
        })
      })
      .then((destroyed) => {
        return cb(null, { sul: args.sul_id, systems: args.system_id, msg: 'uninstalled successfully.' });
      })
      .catch((err) => {
        return cb(err);
      });
  }

  delete(args, opts, cb) {
    if (!args.sul_id || args.sul_id.trim() === '') {
      return cb('Invalid parametes');
    }
    var foundSul: any = null;
    var foundSystems: any = [];
    var sulId = args.sul_id.trim();
    var params: any = {};
    params.where = { sul_id: sulId };

    return this.service.models.sul.findOne(params)
      .then((aSul) => {
        foundSul = aSul;
        if (foundSul === null || foundSul.sul_id !== sulId) {
          throw (`${sulId} does not exist.`);
        }
        return this.service.models.sul_system.findAndCount(params)
      })
      .then((aSystems) => {
        if (aSystems === null || aSystems.count === 0) {
          return false
        }
        _.forEach(aSystems.rows, (aSystem) => {
          if (aSystem !== null && aSystem.system_id.trim() !== '')
            foundSystems.push(aSystem.system_id.trim());
        });
        return Promise.all(foundSystems.map((aOneSystem) => {
          return this.uninstallSpUserListFromNLMS(aOneSystem, sulId);
        }));
      })

      .then((res) => {
        return this.service.models.sul_system.destroy(params);
      })
      .then((destroy) => {
        return this.service.models.sul_song.destroy(params);
      })
      .then((destory) => {
        return this.service.models.sul.destroy(params);
      })
      .then((destroy) => {
        return cb(null, { sul: sulId, systems: foundSystems, msg: 'removed successfully.' });
      })
      .catch((err) => {
        return cb(err);
      });
  }

  uninstallSpUserListFromNLMS(aSystemId, aSulId) {
    var req: any = {
      verb: {
        event_category: 'request_system',
        event: 'delete_list'
      },
      object: {
        list_name: aSulId,

      },
      target: {
        system: aSystemId,
      }
    };
    return new Promise((y, x) => {
      if (this.service.rmqRpc !== undefined)
        this.service.rmqRpc.sendRpc('nl-hdms.request', req, {}, { trace_id: this.service.uuid() });
    });
  }

  //***********************************************************************************************************

  // List set
  //***********************************************************************************************************
  handleSetList(args, opts, cb) {
    console.info(this.logPrefix + `>>>>>>>>>>> Received set_list event<<<<<<<<<<<<<<< `)
    return Promise.resolve()
      .then(() => {
        // delete any missing lists from the systems lists
        let query: string = `SELECT *
                                FROM ${this.config.sequelize.database}.sul_systems

                                WHERE system_id = '${args.actor.system}'`


        return this.service.sequelize.query(query)
      })
      .then((result) => {
        if (result.length <= 0 || result[0].length <= 0)
          return

        let deleteEntries: Array<number> = []
        let foundEntries: Array<number> = []
        let spotifyLists = args.object.lists.filter(v => v.type.toUpperCase() === 'S')
        _.forEach(result[0], (list) => {
          let foundEntry = spotifyLists.find((entry) => { return list.sul_id === entry.name })

          if (!foundEntry)
            deleteEntries.push(list.id)
          else {
            // delete duplicates

            if (foundEntries.includes(foundEntry))
              deleteEntries.push(list.id)
            else
              foundEntries.push(foundEntry)
          }

        })

        if (deleteEntries.length > 0) {
          console.log('Removing ' + deleteEntries.length + ' Entries from ' + args.actor.system)
          let query: string = `DELETE FROM ${this.config.sequelize.database}.sul_systems
                                    WHERE id IN (${deleteEntries.map((row) => { return `'${row}'` }).join(',')})`

          return this.service.sequelize.query(query)
        }
      })
      .then(() => {
        return this.checkForNewLists(args)
      })
      .catch((error) => {
        console.log(error)
      })

  }

  checkForNewLists(args: any) {
    try {
      console.info(this.logPrefix + `>>>>>>>>>>> Received set_list event<<<<<<<<<<<<<<< `);
      var lists = args.object.lists.filter(v => v.type.toUpperCase() === 'S'); // filter spotify user lists (types == 'S')
      return Promise.map(lists, (aList) => {
        console.info(this.logPrefix + `>>>>> Processing set List for: ${aList.name}:${aList.friendly_name}`)
        if (aList.spotify_list_id !== null && aList.spotify_list_id.trim() !== "") {
          try {
            var spPlaylistTemp = JSON.parse(aList.spotify_list_id);
            var systemTemp = args.actor.system;
            let exists: boolean = false

            let data: any = {
              sul_id: aList.name,
              name: aList.friendly_name,
              description: aList.description,
              sp_user_id: spPlaylistTemp.name,
              sp_playlist_id: spPlaylistTemp.id,
              status: 'b_active'
            }

            // check to see if the list is already there
            var params: any = {};
            params.where = { sul_id: aList.name, sp_playlist_id: spPlaylistTemp.id }
            params.limit = 10;
            return this.service.models.sul.findAndCount(params)
              .then((result) => {
                if (result.count > 0)
                  exists = true

                // update the list information
                return this.service.models.sul.upsert(data)
                  .then((res) => {
                    // see if the system is in the list
                    var params: any = {};
                    params.where = { sul_id: aList.name, system_id: systemTemp }
                    params.limit = 10;
                    return this.service.models.sul_system.findAndCount(params);
                  })
                  .then((sysResult) => {
                    if (sysResult.count === 0) {
                      return this.service.models.sul_system.upsert({
                        sul_id: aList.name,
                        system_id: systemTemp
                      });
                    }
                    else {
                      return false;
                    }
                  })
                  .then((result) => {
                    // make sure the systems list is up to date
                    if (result && exists) {
                      // check the hash
                      return this.sameHash(data.sp_playlist_id, data.sul_id)
                        .then((hash) => {
                          if (!hash) {
                            return this.getSpotifyIDs(spPlaylistTemp.id)
                              .then((result) => {
                                if (result.length === 0 || result[0].length === 0)
                                  throw Error('No Song IDS found')
                                return this.getNlMatches(JSON.parse(result[0][0].songs))
                              })
                              .then((result) => {
                                if (!(result && result.object && result.object.mapping))
                                  throw Error('No Song IDS found')
                                return this.updateSpUserList(systemTemp, data, result.object.mapping)
                              })
                          }
                          else {
                            data.sp_key = hash
                            this.updateSulInNLMSs([data])
                          }
                        })
                    }
                  });
              })
          } catch (ex) {
            return false;
          }
        }
      })
        .then((res) => {
          console.info(this.logPrefix + '>>>>>>>>>>> set_list event completed\n');
        })
        .catch((err) => {
          this.log.error('\n ???????  set_list event error ' + err);
        });
    } catch (err) {
    }
  }

  sameHash(spotifyID, nightlifeID) {
    return Promise.resolve()
      .then(() => {
        return Promise.all([
          this.service.controllers.spotifyApi.getPlaylistSnapshot(spotifyID),
          Promise.resolve()
            .then(() => {

              let params: any = { where: { sul_id: nightlifeID } }
              return this.service.models.sul.find(params)
            })
        ])
          .spread((hash, storedHash) => {
            return storedHash.sp_key === hash ? undefined : storedHash.sp_key
          })
      })
  }

  findSul(args, opts, cb) {

    this.find(this.service.models.sul, args, opts, cb)
  }

  find(model, args, opts, cb) {
    let params: any = {};
    if (args.where) {
      // params.where = this..sanitize(args.where);
      params.where = args.where;
    }
    params.limit = args.limit || 1000;


    if (args.offset) {
      params.offset = args.offset;
    }
    if (args.order) {

      params.order = _.deepMapValues(args.order, (value, propPath) => {
        if ((propPath[propPath.length - 1]) === 'model') {
          return this.service.models[value];
        } else {
          return value;
        }
      })
    }

    if (args.sort) {
      params.sort = args.sort;
    }
    if (args.attributes) {
      params.attributes = args.attributes;
    }
    if (args.group) {
      params.group = args.group;
    }

    if (args.include) {

      if (args.include === true) {
        params.include = [{ all: true }];
      }
      else if (_.isArray(args.include)) {
        params.include = _.deepMapValues(args.include, (value, propPath) => {
          if ((propPath[propPath.length - 1]) === 'model') {
            return this.service.models[value];
          } else {
            return value;
          }
        })
      }
      else if (_.isObject(args.include)) {
        args.include.model = this.service.models[args.include.model];
        params.include = args.include;
      }
    }

    params.raw = args.raw || false; //TODO set to true amd update .get()

    model.findAndCountAll(params)
      .then((result) => {
        cb(null, result);
      })
      .catch(cb);
  }

  //***********************************************************************************************************
  // New Database
  //***********************************************************************************************************
  newDatabase(args, opts, cb) {

    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null
    }
    else
      this.stopRun = true
    this.recheckAll = true
    this.logPrefix = 'Checking All --- '

    return Promise.resolve()
      .then(() => {
        // reset the updated at to a week ago
        let date: Date = new Date()
        date.setDate(date.getDate() - 7)

        let query: string = `UPDATE ${this.config.sequelize.database}.suls
                                SET updated_at = '${date.toISOString()}'`

        return this.service.sequelize.query(query)
      })
      .then(() => {
        // wait for the current tasks to finish
        return this.next()
      })
      .then(() => {
        // start testing all
        this.nominateAndUpdateSul()
      })
  }

  private wait(time: number, value?) {
    return new Promise((resolve) => { setTimeout(resolve.bind(null, value), time) })
  }

  // while loop
  private next() {
    return this.wait(500)
      .then(() => {
        if (this.stopRun)
          return this.next()
      })
  }

  //***********************************************************************************************************
  // Refresh List
  //***********************************************************************************************************
  public refreshList(args, opts, cb) {

    console.log(args.list)

    return Promise.resolve()
      .then(() => {
        let params: any = { where: { sul_id: args.list } }

        return this.service.models.sul.find(params)
      })
      .then((result) => {

        if (result === undefined) {
          throw (`${args.list}, internal error missing sul_id`)
        }

        return this.getSpotifyIDs(result.sp_playlist_id)
      })
      .then((result) => {
        if (result.length === 0 || result[0].length === 0)
          throw Error('No Song IDS found')
        return this.getNlMatches(JSON.parse(result[0][0].songs))
      })
      .then((result) => {
        return this.updateSulSongsTable(args.list, result.object.mapping)
      })
      .catch((err) => { })
  }
}

