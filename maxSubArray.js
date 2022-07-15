/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let maxSoFar = -Infinity   
    let maxEndingHere = 0
    for(let i = 0; i < nums.length; i++){
      // this adds the number even if its negative
      maxEndingHere += nums[i]
      // maxSoFar just stores the max of all maxSoFars
      maxSoFar = Math.max(maxEndingHere, maxSoFar)
      // reset the ending number to 0 if negative
      // if we start with a bunch of negatives we just
      // move were the array started to the right
      // this makes sense since you either add -1 or not which one is maximum
      maxEndingHere = Math.max(maxEndingHere, 0)
    }
    return maxSoFar
};

let a = [-2,-3,4,-1,-2,1,5,-3]
console.log(maxSubArray(a))
