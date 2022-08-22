let a = [1, 3, 6, 2, 5, 10];
// let a = [3,6,10,5,10,-1]

const getNextHighestElement = (arr) => {
  if (arr.length === 1) return [-1];
  let results = Array(arr.length).fill(-1),
    stack = [0];
  for (let i = 1; i < arr.length; i++) {
    while (arr[i] > arr[stack[stack.length - 1]]) {
      results[stack.pop()] = arr[i];
    }
    stack.push(i);
  }
  return results;
};

getNextHighestElement(a);
