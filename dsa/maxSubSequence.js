const maxSubSequence = (arr) => {
  let sub = 0
  let max = 0
  for(let x = 0; x < arr.length; x++){
    (arr[x] < 0) ? sub = 0 : sub += arr[x]
    max = Math.max(sub, max)
  }
  return max
}


console.log(maxSubSequence([1,3,2,-10,1111,9])) //11
