let arr = [1, 2, 3, 4, 5]
let newArr = []

//simple solution
for (let i = arr.length - 1; i > -1; i--) {
  newArr.push(arr[i])
}

console.log(newArr)

//no extra memory
let [lo, hi] = [0, arr.length - 1]
while (hi > lo) {
  [arr[hi], arr[lo]] = [arr[lo], arr[hi]]
  lo++; hi--;
}

console.log(arr)

