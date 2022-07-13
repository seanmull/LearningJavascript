// Given a string s, find the length of the longest substring without repeating characters.
// Example 1:
//
// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.
// Example 2:
//
// Input: s = "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.
// Example 3:
//
// Input: s = "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
// Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let max = 0, count = 0
  let p = 0
  let cache = new Set()    

  while(p < s.length){
    if(!cache.has(s[p])){
      count++ 
      max = Math.max(max, count)
    }else{
      count = 1
      cache.clear()
    }
    cache.add(s[p])
    p++
  }
  return max
};

console.log(lengthOfLongestSubstring("pwwkew"))
console.log(lengthOfLongestSubstring("bbbbb"))
console.log(lengthOfLongestSubstring("abcabcbb"))
