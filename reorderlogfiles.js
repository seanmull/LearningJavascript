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
    let logsMap = logs.map(log => {
      let contents = log.slice(log.indexOf(" ") + 1) 
      return {
        msg: log,
        contents: contents,
        //true for digit
        type: /[0-9]/.test(contents)
      }}) 
    let digitLogs = logsMap.filter(log => log.type)
    let letterLogs = logsMap.filter(log => !log.type)
                            .sort((a, b) => (a.contents).localeCompare(b.contents))
    return [...letterLogs, ...digitLogs].map((log) => log.msg)
};

let logs = ["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"]
console.log(reorderLogFiles(logs))
let dig = "dig1 8 1 5 1"
dig.slice(dig.indexOf(" ") + 1)
let letter = "let1 art can"
