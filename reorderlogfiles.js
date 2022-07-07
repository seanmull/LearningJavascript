/**
 * @param {string[]} logs
 * @return {string[]}
 */
// You are given an array of logs. Each log is a space-delimited string of words, where the first word is the identifier.
//
// There are two types of logs:
//
//
// Letter-logs: All words (except the identifier) consist of lowercase English letters.
// Digit-logs: All words (except the identifier) consist of digits.
//
// Reorder these logs so that:
//
//
// The letter-logs come before all digit-logs.
// The letter-logs are sorted lexicographically by their contents. If their contents are the same, then sort them lexicographically by their identifiers.
// The digit-logs maintain their relative ordering.
// Return the final order of the logs.

// Example 1:
//
// Input: logs = ["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"]
// Output: ["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]
// Explanation:
// The letter-log contents are all different, so their ordering is "art can", "art zero", "own kit dig".
// The digit-logs have a relative order of "dig1 8 1 5 1", "dig2 3 6".


var reorderLogFiles = function(logs) {
    return logs.map((log) => {
      let contents1 = log.slice(log.indexOf(" ") + 1) 
      return  {
        "id": log.split(" ")[0],
        "contents": contents1,
        "isDigit": /[0-9]/.test(contents1[0])
      }
    }).sort((log1, log2) => {
      if(!log1.isDigit && !log2.isDigit){
        let cmp = log1.contents.localeCompare(log2.contents)
        if(cmp !== 0){
          return cmp
        }
        return log1.id.localeCompare(log2.id)
      }

      if(!log1.isDigit && log2.isDigit){
        return -1
      }else if(log1.isDigit && !log2.isDigit){
        return 1
      }else{
        return 0
    }}).map((log) => log.id + " " + log.contents)
};
let logs = ["dig1 8 1 5 1","let9 art can","dig2 3 6","let2 own kit dig","let3 art can"]
console.log(reorderLogFiles(logs))
let dig = "dig1 8 1 5 1"
dig.slice(dig.indexOf(" ") + 1)
let letter = "let1 art can"
// var reorderLogFiles = function(logs) {
//   let compareTo = (log1, log2) => {
//     let [id1, ...content1] = log1.split(" ")
//     content1 = content1.join(" ")
//     let [id2, ...content2] = log2.split(" ")
//     content2 = content2.join(" ")
//     let isDigit1 = /[0-9]/.test(content1[0])
//     let isDigit2 = /[0-9]/.test(content2[0])
//
//     if(!isDigit1 && !isDigit2){
//       let cmp = content1.localeCompare(content2)
//       if(cmp !== 0){
//         return cmp
//       }
//       return id1.localeCompare(id2)
//     }
//
//     if(!isDigit1 && isDigit2){
//       return -1
//     }else if(isDigit1 && !isDigit2){
//       return 1
//     }else{
//       return 0
//     }
//   }
//   logs.sort(compareTo)
//   return logs
// };
// var reorderLogFiles = function(logs) {
//     let logsMap = logs.map(log => {
//       let contents = log.slice(log.indexOf(" ") + 1) 
//       return {
//         msg: log,
//         contents: contents,
//         //true for digit
//         type: /[0-9]/.test(contents)
//       }}) 
//     let digitLogs = logsMap.filter(log => log.type)
//     let letterLogs = logsMap.filter(log => !log.type)
//                             .sort((a, b) => (a.contents).localeCompare(b.contents))
//     return [...letterLogs, ...digitLogs].map((log) => log.msg)
// };
let s = "adfas asdfsa sadfa"
let [a, ...b] = s.split(" ")
b = b.join(" ")

a
b
