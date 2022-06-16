
function canAttendMeetings(intervals) {
  let left = 0;
  let right = 1;
  intervals.sort((a, b) => a[0] - b[0])
  intervals
  let n = intervals.length;

  while (right < n) {
    if (intervals[left][1] > intervals[right][0]) {
      return false;
    }
    left++;
    right++;
  }
  return true;
}

const intervals = [[0, 15], [5, 10], [15, 20]]
console.log(canAttendMeetings(intervals));
