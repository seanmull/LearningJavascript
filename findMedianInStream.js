var MedianFinder = function() {
  this.arr = [];
};

MedianFinder.prototype.addNum = function(num) {
  let a = this.arr
  let lo = 0, hi = a.length -1, mid, f
  while(hi >= lo){
        mid = Math.floor((lo + hi)/2)
        if(a[mid] === num){
            break
        }else if(a[mid] >= num){
            hi = mid - 1
            f = false
        }else{
            lo = mid + 1
            f = true
        }
    }
    a.splice(mid + (f ? 1 : 0), 0, num)
};

MedianFinder.prototype.findMedian = function() {
    let a = this.arr
    let n = Math.floor(a.length/2)
    if(a.length % 2 === 0){
        return (a[n] + a[n - 1]) / 2
    }
    return a[n]
};

/** 
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
