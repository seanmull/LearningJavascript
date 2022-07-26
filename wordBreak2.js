/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */

var wordBreak = function(s, wordDict) {
  
    let dp = Array(s.length + 1).fill().map(m => [])
    dp[0] = [[]]
    let newCombo;
    let index;
    let dp_len = dp.length, wordDictLen = wordDict.length
    
    for(let i = 0; i < dp_len; i++){
        for(let j = 0; j < wordDictLen; j++){ 
            index = i + wordDict[j].length
            if(s.slice(i, index) === wordDict[j]){
                newCombo = dp[i].map(sub => [...sub, wordDict[j]])
                dp[index].push(...newCombo)
            }
                
        }
    }
    return dp[s.length].map(a => a.join(" "))
};
