const fib = (x) => {
  if (x < 2) {
    return 1;
  }
  return fib(x - 1) + fib(x - 2);
};
// fib(0) , fib(1) = 1
console.log(fib(0));
console.log(fib(1));
console.log(fib(2));
console.log(fib(3));
fib(4);
