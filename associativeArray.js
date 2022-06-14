const arr = {
  "key1": "value1",
  "key2": "value2"
}

Object.size = (arr) => {
  let size = 0
  for(let key in arr){
    if(arr.hasOwnProperty(key)) size++;
  }
  return size
}

let len = Object.size(arr)
console.log(len)

Object.keys(arr)

for(let key in arr){
  let value = arr[key]
  console.log(`${key} : ${value}`)
}
