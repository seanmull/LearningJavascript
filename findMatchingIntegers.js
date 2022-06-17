let arr = [1, 2, 3, 4, 5, 6, 11]

const findMatchingInteger = (arr) => {
  const alreadyPassedInteger = new Set()
  for (let ele of arr) {
    if (alreadyPassedInteger.has(ele)) return ele
    alreadyPassedInteger.add(ele)
  }
  return undefined
}

console.log(findMatchingInteger(arr))

