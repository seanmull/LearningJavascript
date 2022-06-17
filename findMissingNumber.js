const arr = [1, 2, 3, 5]

const findMissingNumber = (arr) => {
  let totalSum = 0
  for (let i = 1; i < arr.length + 2; i++) totalSum += i
  return totalSum - arr.reduce((x, y) => x + y)
}

console.log(findMissingNumber(arr))
