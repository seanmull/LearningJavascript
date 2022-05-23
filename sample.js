import { SpotifyServiceContainer, SpotifyConfig } from "../spotify"
import { ISkelConfig } from "@nightlife/nl-skeletor/src/config"
import { BaseController } from '@nightlife/nl-skeletor/src/base_controller'

let Promise = require('bluebird')
let _ = require('lodash')

interface InvalidNightlifeID {
  system: string
  nightlifeID: string
  spotifyID: string
  name: string
  description: string
  userID: string
  delete: boolean
}

export class FixListsController extends BaseController {

  service: SpotifyServiceContainer
  config: ISkelConfig & SpotifyConfig

  private recheckTime: number = 1 * 24 * 60 * 60 * 1000
  private limit: number = 20
  private NS_PER_SEC = 1e9
  private cleanOnly: boolean = false
  private updateLists: boolean = true
  private cleanupSelectionSets: boolean = true

  private allSystems: Array<string> = []
  private allSpotifySystems: Array<string> = []

  constructor(config: ISkelConfig & SpotifyConfig, service: SpotifyServiceContainer) {
    super(service, 'UpdateSystemController', config)

    this.service = service

    //console.log('S436371346 = ' + this.createStringName("0WAhmENfcBSap31O4t84Eq"))

    setTimeout(() => {
      this.getAllSystems()
        .catch((error) => {
          console.log(error)
        })
        .then(() => {
          console.log('Finished adding Missing lists')
          this.mainLoop(0)
        })
    }, 5000)
  }

  private getAllSystems() {
    return Promise.resolve()
      .then(() => {
        // get all system codes
        let query: string = `SELECT TRIM(system) AS system
                                FROM ${this.config.e_tracker.database}.groups_operational
                                JOIN ${this.config.e_tracker.database}.clients_operational_groups_link
                                ON groups_operational.index_id = op_group_id
                                JOIN ${this.config.e_tracker.database}.systems
                                ON clients_operational_groups_link.client_code = systems.client_code
                                WHERE system NOT LIKE '%Z'
                                ORDER BY system ASC`

        return this.service.eTrackerPool.query(query)
      })
      .then((results) => {
        // only get system codes that have a music system attached
        if (results.length === 0 || results[0].length === 0)
          return

        let query: string = `SELECT TRIM(system) AS system
                                FROM ${this.config.live_temp.database}.systems_cache
                                WHERE system IN (${results[0].length ? results[0].map(row => `"${row.system}"`).join(',') : '""'})`

        return this.service.liveTempDBPool.query(query)
      })
      .then((results) => {
        if (results.length === 0 || results[0].length === 0)

          return

        this.allSystems = _.map(results[0], (row) => { return row.system })
        return this.trackUntrackedSystems()
      })
  }

  private trackUntrackedSystems() {
    return Promise.resolve()
      .then(() => {
        return this.getSystems(0, this.allSystems.length)
      })
      .then((results) => {

        let notTracked = _.difference(this.allSystems, results)

        return Promise.all([
          this.cleanupLists(notTracked),

          notTracked
        ])
      })
      .spread((results, notTracked) => {

        // find any system that is not tracked and has spotify lists

        let query: string = `SELECT *
                                FROM ${this.config.live_db.database}.music_list
                                WHERE system IN (${notTracked ? notTracked.map(row => `"${row}"`).join(',') : '""'})
                                AND \`name\` REGEXP '^S[[:digit:]]'
                                AND spotify_list_id IS NOT NULL`

        return this.service.liveDBPool.query(query)

      })
      .then((results) => {
        if (results.length === 0 || results[0].length === 0)
          return

        return Promise.all([
          this.addToSuls(results[0]),
          this.addToSystems(results[0])
        ])
      })
  }

  private addToSuls(data) {
    return Promise.resolve()
      .then(() => {
        let query: string = `SELECT sul_id
                                FROM ${this.config.sequelize.database}.suls
                                WHERE sul_id IN (${_.map(data, (row) => { return `"${row.name}"` }).join(",")})`

        return this.service.sequelize.query(query)
      })
      .then((results) => {
        if (results.length === 0 || results[0].length === 0)
          return

        // remove spotify lists nl-spotify already has
        for (let i: number = 0; i < data.length;) {
          if (_.find(results[0], (row) => { return row.sul_id === data[i].name })) {
            data.splice(i, 1)
          }
          else
            ++i
        }

        // remove duplicates
        let have: Array<string> = []
        for (let i: number = 0; i < data.length;) {
          if (have.includes(data[i].name))
            data.splice(i, 1)
          else {
            have.push(data[i].name)
            ++i
          }
        }

        return Promise.map(data, (row) => {

          let name: string = this.service.sequelize.escape(row.friendly_name)
          let description: string = this.service.sequelize.escape(row.description)

          let user: string = description.includes('Spotify') ? "'Spotify'" : "'1'"
          let listID = `'${row.spotify_list_id}'`
          if (row.spotify_list_id) {

            try {
              let data = JSON.parse(row.spotify_list_id)
              listID = this.service.sequelize.escape(data.id)
              user = this.service.sequelize.escape(data.name)
            }
            catch (error) {
              console.log(error)
            }
          }
          let query: string = `INSERT IGNORE INTO ${this.config.sequelize.database}.suls
                                    (sul_id, name, description, sp_user_id, sp_playlist_id, sp_key, status, created_at, updated_at)
                                    VALUES ('${row.name}',${name},${description},${user},${listID},'0','b_active', NOW(), NOW())`

          return this.service.sequelize.query(query)
            .catch((error) => {
              console.log(error)
            })
        }, { concurrency: 1 })
      })
  }

  private addToSystems(data) {
    return Promise.resolve()
      .then(() => {

        return Promise.map(data, (row) => {
          let query = `INSERT IGNORE INTO ${this.config.sequelize.database}.sul_systems
                    (sul_id, system_id, created_at, updated_at)
                    VALUES ('${row.name}', '${row.system}', NOW(), NOW())`

          return this.service.sequelize.query(query)
            .catch((error) => {
              console.log(error)
            })
        }, { concurrency: 1 })
      })
  }

  //*******************************************************************************************************
  // Main Loop
  //*******************************************************************************************************

  private mainLoop(value: number) {

    let offset = value
    let time: [number, number] = process.hrtime()
    let count = 0

    return Promise.resolve()
      .then(() => {
        if (value === 0)
          return this.deleteErrorsTable()
      })
      .then(() => {
        // clean up lists without Spotify information on the system
        console.log('getsystems')
        return this.getSystems(offset, this.limit)
      })
      .then((systems) => {
        count = systems.length

        return this.getOnlineStatus(systems)
      })
      .then((systems) => {
        console.log('Systems ' + JSON.stringify(systems))
        if (systems.length > 0)
          return this.cleanupLists(systems)
      })
      .then(() => {
        if (this.cleanOnly)
          return []
        // check for invalid Nightlife ID's
        console.log('getsystems')
        return this.getSystems(offset, this.limit)
      })
      .then((systems) => {

        if (systems.length == 0)
          return [[], { invalidIDs: [], systemCount: 0 }, []]

        return Promise.all([
          this.getOnlineStatus(systems),
          this.getNightlifeListIDs(systems),
          this.getListsFromScheduler(systems)
        ])
      })
      .spread((onlineStatus: Array<string>, data: { invalidIDs: Array<InvalidNightlifeID>, systemCount: number },
        extraLists: Array<InvalidNightlifeID>) => {

        let keys: string[] = Object.keys(extraLists)
        if (data.invalidIDs.length === 0 && keys.length === 0) {
          //@ts-ignore
          data.onlineStatus = []
          return data
        }

        if (keys.length > 0) {
          _.forEach(keys, (key) => {
            data.invalidIDs = _.concat(data.invalidIDs, extraLists[key])
          })
        }

        console.log('remove entries: ' + data.invalidIDs.length)
        return this.removeInUseLists(data, onlineStatus)
      })
      .then((data: { invalidIDs: Array<InvalidNightlifeID>, systemCount: number, onlineStatus: Array<string> }) => {
        // remove offline systems
        data.invalidIDs = _.filter(data.invalidIDs, (row) => {
          return data.onlineStatus.includes(row.system)
        })

        if (this.updateLists)
          return this.replaceLists(data)
      })
      // insert fix
      // possibly create function seperately
      .then(() => {

        let query: string = "SELECT * FROM suls INNER JOIN sul_songs ON suls.sul_id=sul_songs.sul_id"

        return this.service.sequelize.query(query)
      })
      .then(() => {

        let diff = process.hrtime(time)
        console.log(`Time Take: ${(diff[0] * this.NS_PER_SEC + diff[1]) / this.NS_PER_SEC} secs`)
        console.log('offest: ' + (offset + this.limit))
        if (count < this.limit)
          return this.startTimer()

        return this.mainLoop(offset + this.limit)
      })
      .catch((error) => {
        console.log(error)
        return this.startTimer()
      })
  }

  private startTimer() {
    setTimeout(() => {
      this.mainLoop(0)
    }, this.recheckTime)

    if (this.cleanupSelectionSets)

      return this.fixListErrors()
        .then(() => {
          return this.fixScheduler()
        })
  }

  private deleteErrorsTable() {
    return Promise.resolve()
      .then(() => {
        let query: string = `DELETE FROM ${this.config.sequelize.database}.errors

                                WHERE system IS NOT NULL`

        return this.service.sequelize.query(query)

      })
  }

  private getSystems(offset: number, limit: number) {

    if (limit === this.limit)
      return _.filter(this.allSpotifySystems, (data, index) => { return index >= offset && index < offset + limit })

    return Promise.resolve()
      .then(() => {
        let query: string = `SELECT DISTINCT(system_id)
                                FROM ${this.config.sequelize.database}.sul_systems
                                WHERE system_id IN (${this.allSystems ? this.allSystems.map(subRow => `"${subRow}"`).join(',') : '""'})
                                ORDER BY system_id ASC
                                LIMIT ${offset}, ${limit}`

        return this.service.sequelize.query(query)
      })
      .then((results) => {

        if (results.length === 0 || results[0].length === 0)
          return []

        this.allSpotifySystems = _.map(results[0], (row) => { return row.system_id })
        return this.allSpotifySystems
      })
  }

  private cleanupLists(systems: Array<string>) {

    return Promise.resolve()
      .then(() => {
        let query: string = `SELECT *
                                FROM ${this.config.live_db.database}.music_list
                                WHERE system IN (${systems ? systems.map(subRow => `"${subRow}"`).join(',') : '""'})
                                AND \`name\` REGEXP '^S[[:digit:]]'
                                AND \`name\` LIKE 'S%'
                                AND spotify_list_id IS NULL`

        return this.service.liveDBPool.query(query)
      })
      .then((results) => {
        if (results.length === 0 || results[0].length === 0)
          return

        let data: Array<InvalidNightlifeID> = _.map(results[0], (row) => {
          return {
            system: row.system,
            nightlifeID: row.name,
            spotifyID: '',
            name: row.friendly_name,
            description: row.description,
            userID: row.creator_uid,

            delete: false
          }
        })

        let query: string = `SELECT sul_id, sp_playlist_id, sp_user_id
                                FROM ${this.config.sequelize.database}.suls
                                WHERE sul_id IN (${data ? data.map(subRow => `"${subRow.nightlifeID}"`).join(',') : '""'})`

        return this.service.sequelize.query(query)
          .then((results) => {
            if (results.length === 0 || results[0].length === 0)
              return results

            _.forEach(data, (row) => {

              _.find(results[0], function(data, index) {
                if (data.sul_id == row.nightlifeID) {
                  row.spotifyID = data.sp_playlist_id
                  row.userID = data.sp_user_id
                  return true
                }
              })
            })

            console.log('Clean Up: ' + data.length)
            return Promise.map(data, (row) => {
              return this.createList(row, false)
                .catch((error) => {
                  console.log(error)
                })
            }, { concurrency: 20 })
          })
      })
      .then(() => { return systems })

  }

  private getOnlineStatus(systems: Array<string>) {
    return Promise.resolve()
      .then(() => {
        let query: string = `SELECT DISTINCT(actor_id)
                                FROM ${this.config.live_temp.database}.connections
                                WHERE actor_id IN (${systems.length ? systems.map(row => `"${row}"`).join(',') : '""'})`

        return this.service.liveTempDBPool.query(query)
      })

      .then((results) => {
        if (results.length === 0 || results[0].length === 0)
          return []

        return _.map(results[0], (row) => { return row.actor_id })
      })
  }

  private getNightlifeListIDs(systems: Array<string>) {
    return Promise.resolve()
      .then(() => {
        let query: string = `SELECT system_id AS system, systems.sul_id AS nightlifeID, sp_playlist_id AS spotifyID, name, description, sp_user_id AS userID
                                FROM ${this.config.sequelize.database}.sul_systems AS systems
                                JOIN ${this.config.sequelize.database}.suls AS suls
                                ON systems.sul_id = suls.sul_id
                                WHERE system_id IN (${systems.length ? systems.map(row => `"${row}"`).join(',') : '""'})
                                ORDER BY system_id ASC`

        return this.service.sequelize.query(query)
      })
      .then((results) => {

        if (results.length === 0 || results[0].length === 0)
          return []

        let invalidIDs: Array<InvalidNightlifeID> = []


        _.forEach(results[0], (row) => {
          if (row.nightlifeID !== this.createStringName(row.spotifyID)) {
            row.delete = true
            invalidIDs.push(row)
          }

        })

        return { invalidIDs: invalidIDs, systemCount: systems.length }
      })
  }

  private removeInUseLists(data: { invalidIDs: Array<InvalidNightlifeID>, systemCount: number }, onlineStatus: Array<string>) {
    // group by system
    let systemLists: Array<Array<string>> = []
    _.forEach(data.invalidIDs, (row: InvalidNightlifeID) => {
      if (!systemLists[row.system])
        systemLists[row.system] = []
      systemLists[row.system].push(row.nightlifeID)
    })

    //@ts-ignore
    data.onlineStatus = onlineStatus

    let keys: string[] = Object.keys(systemLists)

    return Promise.resolve()
      .then(() => {

        return Promise.map(keys, (system) => {

          return Promise.all([
            this.listsInScheduler(system, systemLists[system]),
            this.listsInDiscoveryList(system, systemLists[system])
          ])
            .catch((error) => {
              console.log(error)
            })
        })
      })
      .then((results) => {

        // find the lists in use
        let lists: Array<{ list: InvalidNightlifeID, where: string }> = []
        for (let systemID: number = 0; systemID < keys.length; ++systemID) {
          let row = results[systemID]
          // failed to get the data, just remove the entries to try again later
          if (!row) {
            for (let i = 0; i < data.invalidIDs.length; ++i) {
              if (data.invalidIDs[i].system === keys[systemID]) {
                data.invalidIDs.splice(i, 1)
                --i

              }
            }
          }
          else {
            // remove scheduled lists
            if (row[0].length > 0) {
              for (let i = 0; i < data.invalidIDs.length; ++i) {
                if (data.invalidIDs[i].system === keys[systemID] && row[0].includes(data.invalidIDs[i].nightlifeID)) {
                  data.invalidIDs[i].delete = false
                  lists.push({ list: data.invalidIDs[i], where: 'scheduler' })
                }
              }
            }

            // remove discovery lists
            if (row[1].length > 0) {
              for (let i = 0; i < data.invalidIDs.length; ++i) {
                if (data.invalidIDs[i].system !== keys[systemID])
                  continue

                for (let j = 0; j < row[1].length; ++j) {
                  if (row[1][j].includes(data.invalidIDs[i].nightlifeID)) {
                    if (!data.invalidIDs[i].delete)
                      lists.push({ list: data.invalidIDs[i], where: 'scheduler/selection ' + (j + 1) })
                    else
                      lists.push({ list: data.invalidIDs[i], where: 'selection ' + (j + 1) })
                    data.invalidIDs[i].delete = false
                  }
                }
              }
            }
          }
        }

        if (lists.length > 0) {
          let query: string = `INSERT INTO ${this.config.sequelize.database}.errors 
                                    (system, invalid_list, list, location)
                                    VALUES ${lists.map((data) => {
            return `('${data.list.system}','${data.list.nightlifeID}','${this.createStringName(data.list.spotifyID)}','${data.where}')`
          }).join(",")
            }
                                    ON DUPLICATE KEY UPDATE 
                                    location = VALUES(location)`

          return this.service.sequelize.query(query)
            .then((result) => {
              return data
            })
        }

        return data
      })
  }

  private getListsFromScheduler(systems: Array<string>) {
    return Promise.resolve()
      .then(() => {
        // get all spotify lists in the scheduler
        let query: string = `SELECT system, name
                                FROM ${this.config.live_rep.database}.zone_scheduler 
                                WHERE system IN (${systems ? systems.map(subRow => `"${subRow}"`).join(',') : '""'})
                                AND \`name\` REGEXP '^S[[:digit:]]'
                                AND \`name\` LIKE 'S%'`

        return this.service.liveRepDBPool.query(query)
      })
      .then((results) => {
        if (results.length === 0 || results[0].length === 0)
          return [];

        // sort into system
        let newResults: Array<any> = []
        _.forEach(results[0], (row) => {
          if (!newResults[row.system])
            newResults[row.system] = []
          newResults[row.system].push(row.name)
        })
        // remove duplicates
        let keys: string[] = Object.keys(newResults)
        _.forEach(keys, (key) => {
          newResults[key] = [...new Set(newResults[key])];
        })

        let bad: Array<Array<any>> = []
        return Promise.map(keys, (key) => {

          return Promise.all([
            Promise.resolve()
              .then(() => {
                let query: string = `SELECT *
                                            FROM ${this.config.sequelize.database}.suls
                                            WHERE sul_id IN (${newResults[key] ? newResults[key].map(subRow => `"${subRow}"`).join(',') : '""'})`

                return this.service.sequelize.query(query)
              }),
            Promise.resolve()
              .then(() => {
                let query: string = `SELECT *
                                            FROM ${this.config.live_db.database}.music_list
                                            WHERE system = '${key}'
                                            AND \`name\` IN (${newResults[key] ? newResults[key].map(subRow => `"${subRow}"`).join(',') : '""'})`

                return this.service.liveDBPool.query(query)
              })
          ])
            .spread((results, liveData) => {

              // merge data
              if (results[0].length !== liveData[0].length) {

                _.forEach(liveData[0], (row) => {
                  let found: boolean = false
                  for (let i: number = 0; i < results[0].length; ++i) {
                    if (row.name === results[0][i].sul_id) {
                      found = true
                      break
                    }
                  }

                  if (!found) {
                    let listID = row.spotify_list_id
                    if (row.spotify_list_id) {

                      try {

                        let data = JSON.parse(row.spotify_list_id)
                        listID = data.id
                      }
                      catch (error) {
                        console.log(error)
                      }
                    }


                    results[0].push({
                      description: row.description,
                      name: row.friendly_name,
                      sp_key: '0',
                      sp_playlist_id: listID,
                      sp_user_id: row.creator_uid,
                      status: 'b_active',
                      sul_id: row.name
                    })
                  }
                })
              }

              bad[key] = []
              _.forEach(results[0], (row) => {
                if (!row.sp_playlist_id || this.createStringName(row.sp_playlist_id) !== row.sul_id) {

                  let data: InvalidNightlifeID = {
                    system: key,
                    nightlifeID: row.sul_id,
                    spotifyID: row.sp_playlist_id,
                    name: row.name,
                    description: row.description,
                    userID: row.sp_user_id,
                    delete: false
                  }

                  bad[key].push(data)
                }
              })
            })
        }, { concurrency: 10 })
          .then(() => {
            return bad
          })
      })
  }

  private listsInScheduler(system: string, lists: Array<string>) {
    return Promise.resolve()
      .then(() => {
        let query: string = `SELECT name
                                FROM ${this.config.live_rep.database}.zone_scheduler
                                WHERE system = '${system}'
                                AND name IN (${lists.length ? lists.map(row => `"${row}"`).join(',') : '""'})`

        return this.service.liveRepDBPool.query(query)
      })
      .then((results) => {
        if (results.length === 0 || results[0].length === 0)
          return []

        return _.map(results[0], (row) => { return row.name })
      })
  }

  private listsInDiscoveryList(system: string, lists: Array<string>) {
    return Promise.resolve()
      .then(() => {
        let query: string = `SELECT data
                                FROM ${this.config.live_temp.database}.syszone_state
                                WHERE system = '${system}'

                                AND \`key\` = 'selection_sets'
                                AND zone = '0'`

        return this.service.liveTempDBPool.query(query)
      })
      .then((results) => {
        if (results.length === 0 || results[0].length === 0)
          return []

        let foundLists: Array<Array<string>> = []
        let data = JSON.parse(results[0][0].data)
        if (data.sets) {
          let current: number = 0
          _.forEach(data.sets, (set) => {
            foundLists[current] = []
            _.forEach(lists, (list) => {
              if (set.lists.includes(list))
                foundLists[current].push(list)
            })
            ++current
          })

          return foundLists
        }

        return []
      })
  }

  private replaceLists(data: { invalidIDs: Array<InvalidNightlifeID>, systemCount: number }) {

    return Promise.resolve()
      .then(() => {

        // reduce the data
        let temp: Array<InvalidNightlifeID> = []
        _.forEach(data.invalidIDs, (row) => {
          if (!_.find(temp, (element, index) => {
            return element.system === row.system && element.nightlifeID === row.nightlifeID
          })) {
            temp.push(row)
          }
        })

        data.invalidIDs = temp
      })
      .then(() => {

        if (data.systemCount == 0)
          return data

        return Promise.map(data.invalidIDs, (row: InvalidNightlifeID) => {

          return this.createList(row, true)
            .then((result: boolean) => {
              if (row.delete && result)
                return this.deleteList(row.system, row.nightlifeID)
            })
        }, { concurrency: 4 }).delay(100)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        return data.systemCount
      })
  }

  private deleteList(system: string, listID: string) {
    return Promise.resolve()
      .then(() => {
        if (this.service.rmqRpc !== undefined) {
          let req: any = {
            verb: {
              event_category: 'request_system',
              event: 'delete_list'
            },
            object: {
              systems: [{ system: system }],
              list_name: listID
            },
            target: {
              system: system,
            }
          }

          return this.service.rmqRpc.sendRpc('nl-hdms.request', req, {}, { trace_id: this.service.uuid() })
            .then((response: any) => {
              if (response.verb.event !== 'error') {
                console.log(`** Deleted List (${system}): ${listID}`)

                this.writeToLog(`Deleted List (${system}): ${listID}`)
              }
              else {
                if (response.object.code !== 'missing_list') {
                  console.warn(response)
                  return
                }
              }


              let query: string = `DELETE FROM ${this.config.sequelize.database}.sul_systems
                                        WHERE sul_id = '${listID}'
                                        AND system_id = '${system}'`

              this.service.sequelize.query(query)
                .catch((error) => {
                  console.log(error)
                })
            })
        }
      })
  }

  private createList(data: InvalidNightlifeID, useValid: boolean) {

    let correctID = useValid ? this.createStringName(data.spotifyID) : data.nightlifeID

    if (!correctID || correctID.length === 0)
      return Promise.resolve()

    console.log(`** Sending List (${data.system}): ${correctID}`)

    return Promise.resolve()
      .then(() => {
        let query: string = `SELECT song_id
                                FROM ${this.config.sequelize.database}.sul_songs
                                WHERE sul_id = '${correctID}'`

        return this.service.sequelize.query(query)

      })
      // if the right one failed use the wrong one to get the 
      .then((results) => {
        if (results.length === 0 || results[0].length === 0) {

          let query: string = `SELECT song_id
                                    FROM ${this.config.sequelize.database}.sul_songs
                                    WHERE sul_id = '${data.nightlifeID}'`

          return this.service.sequelize.query(query)
        }

        return results
      })
      .then((results) => {
        if (this.service.rmqRpc !== undefined) {
          let req: any = {
            verb: {
              event_category: 'request_system',
              event: 'set_list'
            },
            object: {
              systems: [{ system: data.system }],
              list_name: correctID,
              friendly_name: data.name,
              description: data.description,
              spotify_list_id: JSON.stringify({ name: data.userID, id: data.spotifyID }),
              songs: results.length > 0 && results[0].length > 0 ? _.map(results[0], (row) => { return row.song_id }) : ['DUMMY']
            },
            target: {
              system: data.system,
            }
          }

          return this.service.rmqRpc.sendRpc('nl-hdms.request', req, {}, { trace_id: this.service.uuid() })
            .then((response: any) => {
              if (response.verb.event !== 'error') {
                console.log(`** Updated List (${data.system}): ${correctID}`)

                let name: string = this.service.sequelize.escape(data.name)
                let description: string = this.service.sequelize.escape(data.description)
                let user: string = this.service.sequelize.escape(data.userID)
                let listID: string = this.service.sequelize.escape(data.spotifyID)
                let query: string = `INSERT IGNORE INTO ${this.config.sequelize.database}.suls
                                            (sul_id, name, description, sp_user_id, sp_playlist_id, sp_key, status, created_at, updated_at)
                                            VALUES ('${correctID}',${name},${description},${user},${listID},'0','b_active', NOW(), NOW())`

                this.service.sequelize.query(query)
                  .catch((error) => {
                    console.log(error)
                  })

                query = `INSERT IGNORE INTO ${this.config.sequelize.database}.sul_systems
                                (sul_id, system_id, created_at, updated_at)
                                VALUES ('${correctID}', '${data.system}', NOW(), NOW())`

                this.service.sequelize.query(query)
                  .catch((error) => {
                    console.log(error)
                  })

                this.writeToLog(`Updated List: (${data.system}) ${data.nightlifeID} -> ${correctID}`)

                return true
              }
              else {
                if (response.object.code !== 'system_disconnected') {
                  let query: string = `INSERT IGNORE INTO ${this.config.sequelize.database}.errors
                                                (system, invalid_list, list, location)
                                                VALUES ('${data.system}','${response.object.code}', '${response.object.error}', '')`

                  this.service.sequelize.query(query)

                    .catch((error) => {
                      console.log(error)
                    })
                }
              }

              return false
            })
        }
      })
  }

  private createStringName(spotifyName: string) {

    if (!spotifyName)
      return ''

    let stringName: string = 'S'

    let sectionsLength: number = Math.floor(spotifyName.length / 3)

    let uid: number = 0
    let multiplier: number = 1
    let start: number = 0
    let end: number = sectionsLength + (spotifyName.length % 3)

    for (let i: number = 0; i < 3; ++i) {
      for (let j: number = start; j < end; ++j)
        uid += spotifyName.charCodeAt(j) * multiplier

      start = end
      end += sectionsLength
      multiplier *= 1000
    }

    return stringName + (uid % 1000000000)
  }

  private fixListErrors() {
    return Promise.resolve()
      .then(() => {
        let query: string = `SELECT *
                                FROM ${this.config.sequelize.database}.errors
                                WHERE location LIKE '%selection%'`

        return this.service.sequelize.query(query)

      })
      .then((results) => {
        if (results.length === 0 || results[0].length === 0)
          return

        let errors: Array<any> = []
        _.forEach(results[0], (row) => {
          if (!errors[row.system])
            errors[row.system] = []

          errors[row.system].push(row)
        })

        return this.fixSelectionSets(errors)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        console.log("Fixing Errors Done")
      })
  }

  private fixSelectionSets(errors) {

    let keys: string[] = Object.keys(errors)

    return Promise.resolve()
      .then(() => {
        return this.getOnlineStatus(keys)
      })
      .then((results) => {
        keys = results
        let systems: string = _.map(keys, (row) => { return `"${row}"` }).join(",")
        return Promise.all([
          Promise.resolve()
            .then(() => {
              let query: string = `SELECT system, name
                                        FROM ${this.config.live_db.database}.music_list
                                        WHERE system IN (${systems})
                                        ORDER BY system ASC`

              return this.service.liveDBPool.query(query)
            }),
          Promise.resolve()
            .then(() => {
              let query: string = `SELECT system, data
                                        FROM ${this.config.live_temp.database}.syszone_state
                                        WHERE system IN (${systems})
                                        AND \`key\` = 'selection_sets'
                                        AND zone = '0'
                                        ORDER BY system ASC`

              return this.service.liveTempDBPool.query(query)
            })
        ])
      })
      .spread((music_list, selection_sets) => {
        if (music_list.length === 0 || music_list[0].length === 0 || selection_sets.length === 0 || selection_sets[0].length === 0)
          return

        // group in to systems
        let musicLists: Array<Array<string>> = []
        _.forEach(music_list[0], (row) => {
          if (!musicLists[row.system])
            musicLists[row.system] = []
          musicLists[row.system].push(row.name)
        })

        let selectionSets: Array<any> = []
        _.forEach(selection_sets[0], (row) => {
          try {
            selectionSets[row.system] = JSON.parse(row.data)
          }
          catch (error) {
            console.log(error)
          }
        })

        return Promise.map(keys, (system) => {
          return this.processSelectionSets(system, musicLists[system], selectionSets[system], errors[system])
        }, { concurrency: 1 })
      })
  }

  private processSelectionSets(system: string, musicLists: Array<string>, selectionSets, errors) {
    return Promise.resolve()
      .then(() => {
        return Promise.map(selectionSets.sets, (set) => {

          let update: boolean = false
          let updatedList: Array<string> = []

          _.forEach(set.lists, (list) => {
            let eIndex: number = -1
            // is this one of the lists to update
            if (_.find(errors, (error, index) => {
              eIndex = index
              return error.invalid_list === list
            })) {
              // do we have the list
              if (musicLists.includes(errors[eIndex].list)) {
                console.log('Old ' + errors[eIndex].invalid_list + ' New ' + errors[eIndex].list)
                updatedList.push(errors[eIndex].list)
                update = true
              }
            }
            else
              updatedList.push(list)
          })

          return { update: update, set: set, lists: updatedList }
        })
      })
      .then((results) => {

        let selectionSets: Array<any> = []
        _.forEach(results, (row) => {
          if (row.update)
            selectionSets.push(row)
        })

        if (selectionSets.length > 0)
          return this.updateSelectionSet(system, selectionSets)
        // TODO: Add error
        console.log('All up to  date: ' + system)
      })
  }

  private updateSelectionSet(system: string, selectionSets: any) {
    return Promise.resolve()
      .then(() => {
        if (this.service.rmqRpc !== undefined) {
          let req: any = {
            verb: {
              event_category: 'request_system',
              event: 'set_selection_sets'
            },

            object: {
              systems: [{ system: system }],
              sets: _.map(selectionSets, (row) => {
                return {
                  id: row.set.id,
                  name: row.set.name,
                  lists: row.lists
                }
              })
            },
            target: {
              system: system,
            }
          }

          return this.service.rmqRpc.sendRpc('nl-hdms.request', req, {}, { trace_id: this.service.uuid() })
            .then((response: any) => {
              if (response.verb.event !== 'error') {
                console.log(`** Selection Sets updated (${system}): ${selectionSets.length}`)

                let lists: string = _.map(selectionSets, (row) => {
                  return _.map(row.set.lists, (list) => { return `"${list}"` }).join(",")
                }).join(",")

                let query: string = `Selection Sets Updated (${system}): ${lists}`
                this.writeToLog(query)

                // remove from the errors table
                query = `DELETE FROM ${this.config.sequelize.database}.errors
                                            WHERE system = '${system}'
                                            AND invalid_list IN (${lists})
                                            AND location LIKE '%selection%'`


                return this.service.sequelize.query(query)
              }
              else {
                console.warn(response)
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      })
  }

  private fixScheduler() {
    return Promise.resolve()
      .then(() => {
        let query: string = `SELECT *
                                FROM ${this.config.sequelize.database}.errors
                                WHERE location LIKE '%scheduler%'`

        return this.service.sequelize.query(query)
      })
      .then((results) => {
        if (results.length === 0 || results[0].length === 0)
          return

        let errors: Array<any> = []
        _.forEach(results[0], (row) => {
          if (!errors[row.system])
            errors[row.system] = []

          errors[row.system].push(row)
        })

        let keys: Array<string> = Object.keys(errors)
        return Promise.map(keys, (key) => {
          console.log('Schedule ' + key)
          return this.fixSchedule(key, errors[key]).delay(20 * 1000) // the system is under load so wait
        }, { concurrency: 1 })
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        console.log('Fixed schedule errors')
      })
  }

  private fixSchedule(system, errors) {
    return Promise.resolve()
      .then(() => {
        return this.getOnlineStatus([system])
      })
      .then((results) => {

        if (results.length === 0)
          return []

        let query: string = `SELECT *
                                FROM ${this.config.live_rep.database}.zone_scheduler
                                WHERE system = '${system}'`

        return this.service.liveRepDBPool.query(query)
      })
      .then((results) => {
        if (results.length === 0 || results[0].length === 0)
          return []

        return this.setSchedule(system, results[0], errors)
      })
  }

  private setSchedule(system: string, entries, errors) {
    return Promise.resolve()
      .then(() => {
        if (this.service.rmqRpc !== undefined) {

          let req: any = {
            verb: {
              event_category: 'request_zone',

              event: 'set_scheduler'
            },
            object: {
              schedule: _.map(entries, (row) => {

                let correction = _.find(errors, (element) => { return element.invalid_list === row.name })

                return {
                  day: row.day,
                  minutes: row.minutes,
                  mode: row.mode,
                  name: correction && correction.list.length > 0 ? correction.list : row.name
                }
              })
            },
            target: {
              system: system,
              zone: entries[0].zone
            }
          }

          return this.service.rmqRpc.sendRpc('nl-hdms.request', req, {}, { trace_id: this.service.uuid() })
            .then((response: any) => {
              if (response.verb.event !== 'error') {
                console.log(`** Scheduler updated (${system}): ${entries.length}`)

                let query: string = `Scheduler updated (${system}): ${entries.length}`
                this.writeToLog(query)

                // remove from the errors table
                query = `DELETE FROM ${this.config.sequelize.database}.errors
                                            WHERE system = '${system}'
                                            AND invalid_list IN (${entries.map((row) => { return `"${row.invalid_list}"` }).join(',')})
                                            AND location LIKE '%scheduler%'`

                return this.service.sequelize.query(query)
              }
              else {
                console.warn(response)
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      })
  }

  private writeToLog(description: string) {
    let query: string = `INSERT INTO ${this.config.sequelize.database}.logs
                            (description)
                            VALUES ('${description}')`

    this.service.sequelize.query(query)
      .catch((error) => {
        console.log(error)
      })
  }
}

/*
 // Need to change the createList function for this code to work

 return Promise.resolve()
 .then(() => {
     let query: string = `SELECT system, name
                         FROM hdmslive_rep.zone_scheduler 
                         WHERE \`name\` REGEXP 'S+[[:digit:]]'
                         AND \`NAME\` LIKE 'S%'`
     return this.service.liveRepDBPool.query(query)
 })
 .then((results) => {

     let newResults: Array<any> = []
     _.forEach(results[0], (row) => {
         if (!newResults[row.system])
             newResults[row.system] = []
         newResults[row.system].push(row.name)
     })

     newResults = []
     newResults['IVY 03J'] = [
         "S610468672",
         "S440255518",
         "S625595632",
         "S440255518",
         "S625595632",
         "S610468672",
         "S440255518",
         "S625595632",
         "S610468672",
         "S440255518",
         "S625595632",
         "S610468672",
         "S440255518",
         "S625595632",
         "S610468672",
         "S440255518",
         "S625595632",
         "S610468672",
         "S440255518",
         "S625595632",
       ]
     
     let keys:string[] = Object.keys(newResults)
     return Promise.map(keys, (key) => {
         let query: string = `SELECT *
                             FROM ${this.config.sequelize.database}.suls
                             WHERE sul_id IN (${newResults[key] ? newResults[key].map(subRow => `"${subRow}"`).join(',') : '""'})`

         return this.service.sequelize.query(query)
         .then((results) => {

             let bad: Array<any> = []
             _.forEach(results[0], (row) => {
                 if (this.createStringName(row.sp_playlist_id) !== row.sul_id) {
                     bad.push(row.sul_id)

                     let data: InvalidNightlifeID = {
                         system: key,
                         nightlifeID: row.sul_id,
                         spotifyID: row.sp_playlist_id,
                         name: row.name,
                         description: row.description,
                         userID: row.sp_user_id,
                         delete: false
                     }

                     this.createList(data)
                 }
             })

             if (bad.length > 0)
             console.log("system: " + key + " : " + JSON.stringify(bad))                    
         })
     }, {concurrency: 10})
     .then((results) => {
         console.log(results)
     })
 })
*/

