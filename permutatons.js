// Given an array nums of distinct integers, return all the possible permutations.
// You can return the answer in any order.
//
// Example 1:
//
// Input: nums = [1,2,3]
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */

let permute = function (nums) {
  let results = [];
  let backtrack = (perm, nums) => {
    if (nums.length === 0) {
      // be sure to be a copy not perm
      results.push([...perm]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      // add the val to current perm
      perm.push(nums[i]);
      // remove from current number
      nums.splice(i, 1);
      backtrack(perm, nums);
      // return both current perm and nums to previous state at
      // start of loop
      nums.splice(i, 0, perm.pop());
    }
  };
  backtrack([], nums);
  return results;
};
