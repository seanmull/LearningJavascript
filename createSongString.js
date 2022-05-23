
let matchedSongs = ['CF298T3', 'RD341T17']

let sul_id = 'S612213121'

const getQueryValueString = (sul_id, matchedSongs) => {
  return matchedSongs.map(
    (song) => `('${sul_id}', '${song}', NOW(), NOW())`
  ).join(',')
}

console.log(getQueryValueString(sul_id, matchedSongs))

