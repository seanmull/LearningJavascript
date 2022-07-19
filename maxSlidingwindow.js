/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

var maxSlidingWindow = function(nums, k){
    let result = []
    let queue = []
    
    // continues to pop elements if they smaller then what we add
    // this makes it more efficent since max is maintained
    // also num is pushed to maintain ordering
    // lets say we have [1,1]  and we add 5 we don't need to keep storing 1,1 since they are in the past
    let enqueueWithSort = (num) => {
        while(queue.length > 0 && num > queue[queue.length - 1]) queue.pop()
        queue.push(num)
    }
    
    let j = 0
    for(let i = 0; i < nums.length; i++){
        enqueueWithSort(nums[i])
        // start adding stuff once we get past to size of the window
        if(i >= (k - 1)){
            result.push(queue[0])
            // if the num is the max and we pass it remove it
            if(nums[j] === queue[0]) queue.shift()
            j++
        }
        
    }
    return result
    
}
