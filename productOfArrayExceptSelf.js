/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    let pre = Array(nums.length).fill(1)
    let post = Array(nums.length).fill(1)
    let results = Array(nums.length).fill(1)
    
    // pre is the product of all numbers after i
    // [1, 2, 3] => [1, 1, 2]
    let seed = 1
    for(let i = 0; i < nums.length; i++){
        pre[i] = seed
        seed *= nums[i]
    }
    
    // post is the product of all number before j
    // [1, 2, 3] => [6, 3, 1]
    seed = 1
    for(let j = nums.length - 1; j >= 0; j--){
        post[j] = seed
        seed *= nums[j]
    }
    
    // pre * post exclude the number at that index
    // [1, 2, 3] => [6, 3, 2]
    for(let k = 0; k < nums.length; k++){
        results[k] = pre[k] * post[k]
    } 
    return results   
};
