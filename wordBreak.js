/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    let seed = Array(s.length + 1).fill(false)
    seed[0] = true
    for(let i = 0; i < seed.length; i++){
      if(!seed[i]) continue
      let prefix = s.substring(i)
      for(let j = 0; j < wordDict.length; j++){
          if(prefix.startsWith(wordDict[j]) && seed[i]){
              seed[i + wordDict[j].length] = true
          }
      } 
    }
    return seed[s.length]
}
