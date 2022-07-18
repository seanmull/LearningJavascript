/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

let freqCounter = (nums) => {
    let cache = new Map()
    for(let num of nums){
        if(cache.has(num)) {
            let n = cache.get(num)
            cache.set(num, n + 1)
        }else {
            cache.set(num, 1)
        }
    }
    return cache
}

var topKFrequent = function(nums, k) {
    return [...freqCounter(nums)
            .entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, k)
            .map(ele => ele[0])
};
