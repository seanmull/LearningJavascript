let number = 102

let findFactorsOfANumber = (num) => {
  const factors = []
  for (let i = 2; i <= num; i++)
    if (num % i === 0) factors.push(i)
  return factors
}

console.log(findFactorsOfANumber(number))

let findFactorsOfNumber2 = (num) => {
  return [...Array(num + 1).keys()]
    .slice(2)
    .filter((factor) => num % factor === 0)
}

console.log(findFactorsOfNumber2(number))
