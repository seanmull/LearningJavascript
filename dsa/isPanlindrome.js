const isPalindrome = (str) => {
  let lo = 0
  let hi = str.length
  if(hi < 3) return true
  return str[lo] === str[hi - 1] ? isPalindrome(str.slice(++lo, --hi)) : false
}


console.log(isPalindrome("djababajd"))
console.log(isPalindrome("aba"))
