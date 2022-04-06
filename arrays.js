const numbers = [43, 56, 33, 23, 44, 36, 5];
const numbers2 = new Array(22, 45, 33, 76, 54);
const fruit = ["Apple", "Banana", "Orange", "Pear"];
const mixed = [22, "Hello", true, undefined, null, { a: 1, b: 1 }, new Date()];

console.log(numbers.length);
console.log(Array.isArray(numbers));
console.log(numbers[3]);
console.log(numbers.indexOf(36));

numbers;
numbers.push(250);
numbers;
numbers.unshift(120);
numbers;
numbers.pop();
numbers;
numbers.shift();
numbers;
numbers.reverse();
numbers;
console.log(numbers.concat(numbers2));
let a = numbers.sort((x, y) => x - y);
a;
let b = a.find((n) => n > 14);
b;
