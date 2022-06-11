const fib = (x) => {
  return x < 2 ? (x === 0 ? 1 : x) : fib(x - 1) + fib(x - 2)
}
// fib(0) , fib(1) = 1
console.log(fib(0))
console.log(fib(1))
console.log(fib(2))
console.log(fib(3))
console.log(fib(4))
