const averagePair = (nums, target) => {
  if(nums.length === 0) return false
  let lo = 0
  let hi = nums.length - 1
  while(hi > lo){
    let average = (nums[lo] + nums[hi]) / 2
    if(average === target)
      return true
    else if(average > target)
      hi--
    else
      lo++  
  }
  return false
}


console.log(averagePair([1,2,3], 2.5))
//[1,2,3] 2.5
