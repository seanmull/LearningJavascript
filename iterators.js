function makeIterator(arr) {
  let nextIndex = 0
  return () => {
    return nextIndex < arr.length ?
      { value: arr[nextIndex++], done: false } :
      { done: true }
  }
}

let m = makeIterator([1, 2, 3, 4])

m().value
m().value
m()
m()
m()

