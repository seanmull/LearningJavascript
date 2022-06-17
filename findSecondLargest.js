const arr = [1, 2, 3, 4, 5]

const findSecondLargest = (arr) => {
  const largest = Math.max(...arr)
  let secondLargest = -Infinity
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== largest)
      secondLargest = Math.max(secondLargest, arr[i])
  }
  return secondLargest
}

console.log(findSecondLargest(arr))
