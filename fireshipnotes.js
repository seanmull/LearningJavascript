
console.log("hello")
const foo = {name: 'tom', age: 30};
const bar = {name: 'john', age: 25};
const mar = {name: 'mary', age: 70};

console.log({foo, bar, mar})
console.table({foo,bar,mar})

console.time('looper');

let i = 0;
while( i < 10000000){i++}
console.timeEnd('looper');

const foobar = { ...bar, ...foo};
foobar

const sumRandomAsyncNums = async() => {
  const first = await Math.random();
  const second = await Math.random();
  const third = await Math.random();

  console.log({first, second, third});

}

sumRandomAsyncNums();