const factorial = (x) => {
  return x < 2 ? x : x * factorial(--x)
}

console.log(factorial(3))

const factorial_iter = (x, fact = x) => {
  while(x > 1) fact *= --x
  return fact
}

console.log(factorial_iter(3))
