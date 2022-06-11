const maxSubArray = (arr, maxConsecutiveEle) => {
    if(arr.length - 1 < maxConsecutiveEle) return 0
    let max = arr.slice(0, maxConsecutiveEle).reduce((x, y) => x + y) 
    let submax = max
    let lo = 0
    let hi = maxConsecutiveEle - 1 
    while(hi < arr.length - 1){ 
      submax += arr[++hi] - arr[lo++] 
      max = Math.max(submax, max)  
    }
    return max
}

console.log(maxSubArray([1000,9200,300,1400], 2))
