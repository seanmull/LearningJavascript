let num = 233234324

let getListOfStrings = (num) => {
  return String(num).split("")
}

console.log(getListOfStrings(num))

let arr = [[1, 2, 3], ['a', 'b', 'c']]

let getMappingOfStrings = (arr) => {
  let mapping = []
  for (let i = 0; i < arr[0].length; i++) {
    mapping.push(arr[0][i])
    mapping.push(arr[1][i])
  }
  return mapping
}

[...arr[0], ...arr[1]]

console.log(getMappingOfStrings(arr))
