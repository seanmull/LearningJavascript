
// interavals = [[2,6],[1,3],[8,10],[15,18]]
// interavals = [[1,4],[4,5]]
let interavals = [[1,4], [2,3]]

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
   intervals.sort((a,b) => a[0] - b[0])

    let mergedIntervals = [intervals[0]];

    let j = 0;
    for(let i = 1; i < intervals.length; i++){
        if(intervals[i][0] <= mergedIntervals[j][1]){
            mergedIntervals[j][1] = Math.max(intervals[i][1], mergedIntervals[j][1]);
        }else{
            mergedIntervals.push(intervals[i]);
            j++;
        }
    }
    return mergedIntervals 
};
