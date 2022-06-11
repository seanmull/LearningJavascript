const areThereDuplicates = (...nums) => {
  if(nums.length < 2) return false
  let left = 0
  let right = 1
  const end = nums.length
  while(right < end){
    if(nums[left] === nums[right]){
      return true
    }
    left++
    right++
  }
  return false
}

console.log(areThereDuplicates(1, 2))

const areThereDuplicates2 = (...num) => {
  return num.length !== new Set(num).size
}

console.log(areThereDuplicates2(1, 2))
