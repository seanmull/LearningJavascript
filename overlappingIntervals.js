var eraseOverlapIntervals = function(intervals){
  intervals.sort((a,b) => a[0] - b[0])
  let right = 1;
  let left = 0;
  let count = 0;
  const n = intervals.length;
  
  while(right < n){
    if(intervals[left][1] <= intervals[right][0]){
      left = right;
    }
    else if(intervals[left][1] <= intervals[right][1]){
      count++;
    }
    else if(intervals[left][1] > intervals[right][1]){
      left = right;
      count++;
    }
    right++;
  }
  return count;
}


const intervals = [[1,2],[2,3],[3,4],[1,3]];

console.log(eraseOverlapIntervals(intervals))