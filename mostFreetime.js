const { parseInt } = require("lodash");

function ParseTime(time) {
  var timeParts = time.split(':');
  var hours = parseInt(timeParts[0]);
  var minutes = parseInt(timeParts[1].substr(0, 2));
  var AMPM = timeParts[1].substr(2, 2).toUpperCase();
  var totalMinutes = hours * 60 + minutes;
  if (AMPM == 'PM' && hours < 12)
    totalMinutes += 12 * 60;

  return { hours: hours, minutes: minutes, AMPM: AMPM, totalMinutes: totalMinutes };
}

function FormatTime(time) {
  return (time < 10) ? '0' + time : time;
}

function MostFreeTime(strArr) {
  var startTimes = [];
  for (var i = 0; i < strArr.length; i++) {
    var period = strArr[i];
    var times = period.split('-')
    var time1 = ParseTime(times[0]);
    var time2 = ParseTime(times[1]);
    time1.endTime = time2
    startTimes.push(time1);
  }
  startTimes.sort(function(a, b) { return a.totalMinutes - b.totalMinutes });

  //to find difference between times
  var diff = 0; mostDiff = 0;
  for (var i = 0; i < startTimes.length - 1; i++) {
    var endTimeOfEvent = startTimes[i].endTime;
    var startTimeOfNextEvent = startTimes[i + 1];
    var diff = startTimeOfNextEvent.totalMinutes - endTimeOfEvent.totalMinutes;
    if (diff > mostDiff)
      mostDiff = diff;
  }

  var output;
  if (mostDiff < 60)
    output = '00:' + FormatTime(mostDiff);
  else {
    var hours = parseInt(mostDiff / 60);
    var minutes = mostDiff % 60;
    output = FormatTime(hours) + ':' + FormatTime(minutes);
  }
  return output;
}

let input = ["12:15PM-02:00PM", "09:00AM-10:00AM", "10:30AM-12:00PM"];
// console.log(MostFreeTime(input))


let str = "12:15PM"

let times = str.split(":")
times

let hours = times[1].slice(2) ? parseInt(times[0]) + 12 : parseInt(times[0])
let minutes = times[1].slice(0, 2)
minutes
hours






const getMostFreeTime = (arr) => {

  const parseDate = (string) => {
    const times = string.split(":")
    return new Date(0, 0, 0,
      times[1].slice(2) ? parseInt(times[0]) + 12 : parseInt(times[0]),
      times[1].slice(0, 2))
  }

  const parseDates = (arr) => {
    return arr.map((times) => {
      const timeArr = times.split("-")
      return {
        "start": parseDate(timeArr[0]),
        "end": parseDate(timeArr[1])
      }
    })
  }

  const convertMinutesToString = (minutes) => {
    const hours = Math.floor(minutes / 60)
    return [hours, minutes - (hours * 60)].join(":")
  }

  const getDates = parseDates(arr).sort((a, b) => a.start - b.start)
  let timeDiffs = []
  let [i, j] = [0, 1]
  while (j < getDates.length - 1) {
    let timeDiff = getDates[j].start.getMinutes() - getDates[i].end.getMinutes()
    timeDiffs.push(timeDiff)
    i++; j++;
  }
  const maxTimeInMinutes = Math.max(...timeDiffs)
  return convertMinutesToString(maxTimeInMinutes)
}

console.log(getMostFreeTime(input))
