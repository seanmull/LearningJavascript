const flatten = (arr, returnArr) => {
  arr.forEach((ele) => {
    (typeof ele !== "object") ? returnArr.push(ele) : 
        returnArr = flatten(ele, returnArr)
  })
  return returnArr
}

console.log(flatten([1,[2, 4, 5],[3, [3, 4, 5]]], [])) //[1,2,3]


const flatten2 = (arr, returnArr) => {
  if(arr.length === 0) return returnArr
  typeof arr[0] !== "object" ? 
     returnArr.push(arr[0]) : 
     returnArr = flatten(arr[0], returnArr)
  return flatten2(arr.slice(1), returnArr)
}

console.log(flatten2([1,[2, 4, 5],[3, [3, 4, 5]]], [])) //[1,2,3]
