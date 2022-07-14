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
   results = []
   nums.sort() 
   let l = nums.length
   let x = 0, y = 1, z = l - 1
   while(x < l - 2){
      if(y >= z){
        x++
        y = x + 1
        z = l - 1
        continue
      }
      if(nums[x] + nums[y] + nums[z] === 0){
        results.push([nums[x], nums[y], nums[z]]) 
        x++
        y = x + 1
        z = l - 1
      }else if(nums[x] + nums[y] + nums[z] > 0){
        z--
      }else{
        y++
      }
   }
   return results
};


// let nums = [-1,0,1,2,-1,-4]
let nums = [0,1,1]
// let nums = [0,0,0]
console.log(threeSum(nums))
