const regexVowel = /[aeiou]/g
const regexCon = /[bcdefghjklmnpqrstvwxyz]/g

const s = "sadfsadfaw"
const numOfVowel = [...s.matchAll(regexVowel)].length
const numOfCon = [...s.matchAll(regexCon)].length
numOfVowel
numOfCon
