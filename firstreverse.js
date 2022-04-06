function FirstReverse(str) {
  if (str === "") return "";
  return str.slice(-1) + FirstReverse(str.slice(0, -1));
}

console.log(FirstReverse("Hello World"));
let s = "hello";
console.log(s.slice(1));
console.log(s.slice(-1));
