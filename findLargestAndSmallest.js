let arr = [3, 2, 5, 1, 6, 12, 7]

let findLargestsAndSmallest = (arr) => {
  let [smallest, largest] = [Infinity, -Infinity]
  for (let ele of arr) {
    smallest = Math.min(smallest, ele)
    largest = Math.max(largest, ele)
  }
  return [smallest, largest]
}

console.log(findLargestsAndSmallest(arr))
