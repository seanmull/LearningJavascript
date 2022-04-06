/*Have the function FindIntersection(strArr) read the array of strings
 stored in strArr which will contain 2 elements: the first element 
 will represent a list of comma-separated numbers sorted in ascending order, 
 the second element will represent a second list of comma-separated numbers 
 (also sorted). Your goal is to return a comma-separated string containing the numbers that occur 
in elements of strArr in sorted order. If there is no intersection, return the string false. */

// // Input: ["1, 3, 4, 7, 13", "1, 2, 4, 13, 15"]
// Output: 1,4,13

function FindIntersection(strArr) {
  const numbers1 = convertStringToArray(strArr[0]);
  const numbers2 = convertStringToArray(strArr[1]);
  return numbers1.filter((num) => num in numbers2);
}

function convertStringToArray(str) {
  const arr = str.split(", ");
  return arr.map((char) => Number(char));
}

const arr = ["1, 3, 4, 7, 13", "1, 2, 4, 13, 15"];
console.log(FindIntersection(arr));
console.log(convertStringToArray(arr[0]));
