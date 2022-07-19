/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
let merge = (arr1, arr2) => {
    let results = []
    let p1 = 0, p2 = 0
    while(p1 < arr1.length || p2 < arr2.length){
        if(p1 >= arr1.length){
            results.push(arr2[p2])
            p2++
        }else if(p2 >= arr2.length){
            results.push(arr1[p1])
            p1++
        }else if(arr1[p1] >= arr2[p2]){
            results.push(arr2[p2])
            p2++
        }else{
            results.push(arr1[p1])
            p1++
        }
    }
    return results
}



var findMedianSortedArrays = function(nums1, nums2) {
    let sortedArray = merge(nums1, nums2)
    let n = Math.floor(sortedArray.length/2)
    if(sortedArray.length % 2 === 1){
        return sortedArray[n]
    }else{
        return (sortedArray[n - 1] +
               sortedArray[n]) / 2
    }
};

