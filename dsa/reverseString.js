const reverseString = (str) => {
  return str === "" ? str : str.slice(-1) + reverseString(str.slice(0,-1))
}
console.log(reverseString("somethingfdog")) //god
