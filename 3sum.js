// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] 
// such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
// Notice that the solution set must not contain duplicate triplets.
// Example 1:

// Input: nums = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]
// Explanation: 
// nums[0] + nums[1] + nums[1] = (-1) + 0 + 1 = 0.
//
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
// The distinct triplets are [-1,0,1] and [-1,-1,2].
// Notice that the order of the output and the order of the triplets does not matter.
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
   let result = []
   nums.sort()
   // stop 2 places from the end that is where lo and hi are
   for(let i = 0; i < nums.length - 2; i++){
    // if its less then 0 theres no way it can sum to zero since its the earlier element
    // in a sorted array.  Slight optimization
    if(nums[i] > 0) break
    // skip repeats after the first index, this ensures we don't get out of bounds error
    if(i > 0 && nums[i] === nums[i - 1]) continue
    let lo = i + 1, hi = nums.length - 1
    while(lo < hi){
      let sum = nums[i] + nums[lo] + nums[hi]
      if(sum < 0) lo++
      else if(sum > 0) hi--
      else{
        result.push([nums[i], nums[lo], nums[hi]])
        // ensure we don't get repeats after we add the first element
        // check both lo and hi for repeats
        while(lo < hi && nums[lo] === nums[lo + 1]) lo++
        while(lo < hi && nums[hi] === nums[hi - 1]) hi--
        // we still need to check other elements within this lo - hi interval
        lo++
        hi--
      }
    }
   }
   return result
};


// let nums = [-1,0,1,2,-1,-4]
// let nums = [0,1,1]
let nums = [0,0,0]
console.log(threeSum(nums))
