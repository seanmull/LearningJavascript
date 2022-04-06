var insert = function(intervals, newInterval) {
  intervals.push(newInterval)
  intervals.sort((a,b) => a[0] - b[0])
  mergedIntervals = [intervals[0]];

  let j = 0;
  for(let i = 1; i < intervals.length; i++){
      if(intervals[i][0] <= mergedIntervals[j][1]){
          mergedIntervals[j][1] = Math.max(intervals[i][1], mergedIntervals[j][1]);
      }else{
          mergedIntervals.push(intervals[i]);
          j++;
      }
  };
  return mergedIntervals;
};