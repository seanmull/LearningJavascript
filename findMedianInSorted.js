/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let sortedArray = [...nums1, ...nums2].sort((a, b) => a - b)
    let n = Math.floor(sortedArray.length/2)
    if(sortedArray.length % 2 === 1){
        return sortedArray[n]
    }else{
        return (sortedArray[n - 1] +
               sortedArray[n]) / 2
    }
};
