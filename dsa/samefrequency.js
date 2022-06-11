const sameFrequency = (num1, num2) => {
  let freq1 = getFrequency(num1)
  let freq2 = getFrequency(num2)
  for(const key in freq1){
    if(freq1[key] === freq2[key])
      delete freq2[key]
  }
  return Object.keys(freq2).length === 0
}

const getFrequency = (num) => {
  let freq = {}
  const arr = String(num).split("")
  for(let ele of arr)
    ele in freq ? freq[ele]++ : freq[ele] = 1
  return freq
}

console.log(sameFrequency(113, 113))
