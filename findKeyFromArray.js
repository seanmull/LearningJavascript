let results2 = [
  { key: "(H)ard or (S)oft", value: 'S' },
  { key: "SWITCH IF NMV", value: 'YES' },
]

const isAudioOnly = results2.find((obj) => {
  return obj.key === `(H)ard or (S)oft`
  // return obj.key.match(/\(H\)ard or \(S\)oft/)
})

console.log(isAudioOnly ? isAudioOnly.value : "H")


const ignoreNMVcontent = results2.find((obj) => {
  return obj.key === `SWITCH IF NMV`
})

console.log(ignoreNMVcontent ? ignoreNMVcontent.value : "NO")
