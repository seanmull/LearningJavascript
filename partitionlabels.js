/**
 * @param {string} S
 * @return {number[]}
 */

let s = "eccbbbbdec"
var partitionLabels = function(S) {
    let indexMap = new Map();
    let len = S.length;
    
    //This gives the last index of every char
    for(let i=0; i<len; i++) {
        indexMap.set(S[i], i);
    }

    let start = 0, end = 0, i=0, result = [];
    
    while(i < len) {
        // this updates the end of the partition
        // so if we have an "a" at the beginning and "a"
        // we would have only one partition since a "contains" everything
        // the furtheset letter contains everything
        if (indexMap.get(S[i]) > end) {
            end = indexMap.get(S[i]);    
        }
        if (i === end) {
            result.push((end+1)-start);
            start = end + 1;
        }
        i += 1;        
    }
    return result;
};

// abcba
// ^       the last index of a is 4
//  ^
//   ^
//    ^
//     ^  i = end => push the partition update start to end++

// aabbcc 
// ^      the last index of a is 1
//  ^     i = end => push the partition update start to end++
// ... same

console.log(partitionLabels(s))
