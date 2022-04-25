const exams = [80, 90,92, 70]

let words = exams.some(e => e > 92);
console.log(words)

let words2 = exams.every(e => e > 10);
console.log(words2)

function callTwice(func){
  func();
  func();
}

function printHello(){
  console.log("hello");
}

callTwice(printHello)

arguments

function printargs(...args){
  console.log(args);
}

printargs(3,4,5,6,3,2)
