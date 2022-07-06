/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
  */

var topKFrequent = function(words, k) {
  let freqCounter = {}     
  words.forEach((word) => {
    if(freqCounter[word]){
      freqCounter[word]++
    }else{
      freqCounter[word] = 1
    }
  })
  let freqCounter2 = []
  for(const key in freqCounter){
    freqCounter2.push(
      {
        "word": key,
        "freq": freqCounter[key]
      }
    )
  }
  return freqCounter2.sort((a, b) => {
     if(a["freq"] - b["freq"] === 0){
       return a["word"].localeCompare(b["word"])
     }
     return b["freq"] - a["freq"]
  }).slice(0, k).map(a => a.word)
};

let words = ["i","love","leetcode","i","love","coding"], k = 2
console.log(topKFrequent(words, k))
//Output: ["i","love"]
//Explanation: "i" and "love" are the two most frequent words.
//Note that "i" comes before "love" due to a lower alphabetical order.
