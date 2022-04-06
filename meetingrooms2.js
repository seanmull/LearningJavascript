
function canAttendMeetings(intervals) {
  start = intervals.map(x => x[0]).sort((a,b) => a - b)
  end = intervals.map(x => x[1]).sort((a,b) => a - b)
  s = 0, e = 0, count = 0, max = 0;
  while(s < start.length){
     if(start[s] < end[e]){ 
        count++;
        s++;
     }else{
       count--;
       e++;
     } 
     max = Math.max(max, count);
  }
  return max;
}

const intervals = [[0,15],[5,10],[15,20]]
// const intervals = [[2,7]]
console.log(canAttendMeetings(intervals));