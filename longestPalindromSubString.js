// Given a string s, return the longest palindromic substring in s.
//
// Example 1:
//
// Input: s = "babad"
// Output: "bab"
// Explanation: "aba" is also a valid answer.
// Example 2:
//
// Input: s = "cbbd"
// Output: "bb"

let isPalindrome = (s) => {
  let lo = 0
  let hi = s.length - 1
  while(hi > lo){
    if(s[hi] !== s[lo]){
      return false
    }
    hi--; lo++;
  }
  return true
}

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  let lo = 0
  let hi = s.length - 1
  let counter = 0
  while(hi > lo){
    if(isPalindrome(s.substring(lo, hi + 1))){
      return s.substring(lo, hi + 1)
    }
    if(counter % 2 === 0){
      hi--
    }else{
      lo++
    }
    counter++
  }
};

console.log(longestPalindrome("asdsdsdsfa"))
