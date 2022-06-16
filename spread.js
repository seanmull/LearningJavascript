const x = [1, 2, 3, 4]

const y = ...x

console.log(...x)


let obj1 = { foo: 'bar', x: 42 };
let obj2 = { foo: 'baz', y: 13 };

let clonedObj = { ...obj1 };
clonedObj
clonedObj === obj1

let mergedObj = { ...obj1, ...obj2 };
mergedObj

!!mergedObj

let set_x = new Set(x)
set_x
set_x.add(() => console.log("something"))
set_x




