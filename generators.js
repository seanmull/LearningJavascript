function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let g = generateSequence();

console.log(g.next())
console.log(g.next())
console.log(g.next())

for (let val of g) {
  console.log(val)
}


