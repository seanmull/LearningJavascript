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
  let max = 0
  let r = 0, l = 0
  let cache = new Set()    

  while(r < s.length){
    if(!cache.has(s[r])){
      max = Math.max(max, r - l + 1)
      cache.add(s[r])
      r++
    }else{
      cache.delete(s[l])
      l++
    }
  }
  return max
};

console.log(lengthOfLongestSubstring("pwwkew"))
console.log(lengthOfLongestSubstring("bbbbb"))
console.log(lengthOfLongestSubstring("abcabcbb"))
console.log(lengthOfLongestSubstring("dvdf"))
