const binarySearch = (arr, target) => {
  let lo = 0
  let hi = arr.length - 1
  let mid
  while (hi >= lo) {
    mid = Math.floor((lo + hi) / 2) 
    if(arr[mid] === target) return true 
    arr[mid] > target ? hi = mid - 1 : lo = mid + 1
  }
  return false
}

console.log(binarySearch([1,2,3,4], 1))
console.log(binarySearch([1,2,3,5], 5))

const binarySearch2 = (arr, target, lo, hi) => {
  let mid = Math.floor((lo + hi) / 2)
  if(arr[mid] === target) return true
  if(mid < lo || mid > hi) return false
  return arr[mid] > target ? binarySearch2(arr, target, lo, mid - 1) :
                             binarySearch2(arr, target, mid + 1, hi)
}


console.log(binarySearch2([1,2,3,5], 9, 0, 3))
console.log(binarySearch2([1,2,3,5], 5, 0, 3))

