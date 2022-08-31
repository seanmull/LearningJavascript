#! /usr/bin/env node
console.log("hello");

console.log(1);

let x = 1;
let y = 2;

function add(x: number, y?: number) {
  return x + y!;
}

add(2);
