
// interavals = [[2,6],[1,3],[8,10],[15,18]]
// interavals = [[1,4],[4,5]]
let interavals = [[1,4], [2,3]]

interavals.sort((a,b) => a[0] - b[0])
interavals

let mergedIntervals = [interavals[0]];
mergedIntervals
let j = 0;
for(let i = 1; i < interavals.length; i++){
  if(interavals[i][0] <= mergedIntervals[j][1]){
    mergedIntervals[j][1] = Math.max(interavals[i][1], mergedIntervals[j][1]);
  }else{
    mergedIntervals.push(interavals[i]);
    j++;
  }
}
mergedIntervals
