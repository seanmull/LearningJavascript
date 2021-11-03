function MostFreeTime(strArr) {
    var start = [];
    for (var i = 0; i < strArr.length; i++) {
        const period = strArr[i];
        period
        const times = period.split('-');
        times
        const time1 = ParseTime(times[0]);
        time1
        const time2 = ParseTime(times[1]);
        time1.endTime = time2;
        start.push(time1);
    }
    start
    start.sort((a, b) => a.totalMinutes - b.totalMinutes)
    start

    let mostDiff = 0;
    for (var i = 0; i < start.length - 1; i++) {
        const endTimeOfEvent = start[i].endTime;
        console.log(endTimeOfEvent.totalMinutes)
        const startTimeOfNextEvent = start[i + 1];
        console.log(startTimeOfNextEvent.totalMinutes)
        startTimeOfNextEvent
        const diff = startTimeOfNextEvent.totalMinutes - endTimeOfEvent.totalMinutes;
        diff
        mostDiff = Math.max(mostDiff, diff);
    }

    let output;
    if (mostDiff < 60) {
        output = "00:" + FormatTime(mostDiff);
    } else {
        const hours = parseInt(mostDiff / 60);
        const minutes = mostDiff % 60;
        output = FormatTime(hours) + ":" + FormatTime(minutes);
    }
    return output;
}

function FormatTime(time) {
        return (time < 10) ? '0' + time : time;
    }
function ParseTime(time) {
    const hoursAndMinites = time.split(":");
    const minutes = parseInt(hoursAndMinites[1].substr(0, 2));
    const hours = parseInt(hoursAndMinites[0]);
    const AMorPM = hoursAndMinites[1].substr(2, 2).toUpperCase();
    let totalMinutes = hours * 60 + minutes;
    totalMinutes
    if (AMorPM == "PM" && hours < 12) {
        totalMinutes += 12 * 60;
    }
    return {
        hours: hours,
        minutes: minutes,
        AMorPM: AMorPM,
        totalMinutes: totalMinutes
    };
}
let input = ["12:15PM-02:00PM", "09:00AM-10:00AM", "10:30AM-12:00PM"];
console.log(MostFreeTime(input))