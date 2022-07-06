let s = "eccbbbbdec"

//Output [10]

let freqCounter = (string) => {
  let obj = {}
  for(let s of string){
    if(obj[s]){
      obj[s]++
    }else{
      obj[s] = 1
    }
  }
  return obj
}

let checkIfTheIsLettersLeftOnTheOtherSide= (arr, obj) => {
  for(let ele of arr){
    if(obj[ele] !== 0){
        return true
    }
  }
  return false
}

// s = "ababcbacadefegdehijhklij"

var partitionLabels = function(s) {
  let charHasPassed = [] 
  let count = 0
  let lengths = []
  let freq = freqCounter(s)

  for(let ch of s){
    charHasPassed.push(ch)
    freq[ch]--
    count++
    if(!checkIfTheIsLettersLeftOnTheOtherSide(charHasPassed, freq)){
      lengths.push(count) 
      count = 0
      charHasPassed = []
    }
  }
  if(count !== 0){
    lengths.push(count) 
  }
  return lengths
};
console.log(partitionLabels(s))
