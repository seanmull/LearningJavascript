/*Questions Marks
Have the function QuestionsMarks(str) 
take the str string parameter, 
which will contain single digit numbers, 
letters, and question marks, and 
check if there are exactly 3 
question marks between every pair 
of two numbers that add up to 10. 
If so, then your program should return 
the string true, otherwise it 
should return the string false. If there aren't 
any two numbers that add up to 10 in the string, 
then your program should return false as well.

For example: if str is "arrb6???4xxbl5???eee5" 
then your program should return true because 
there are exactly 3 question marks between 
6 and 4, and 3 question marks between 5 and 
5 at the end of the string.
Examples
Input: "aa6?9"
Output: false
Input: "acc?7??sss?3rr1??????5"
Output: true */
function QuestionsMarks(str) { 
	const loc = numberLocations(str);
	let lo = 0;
	let hi = 1;
	let weHaveThreeQuestionMarks = false;
	while(hi <= loc.length){
		if(isThereThreeQuestionMarks(str, loc[lo], loc[hi])){
			if(Number(str[loc[lo]]) + Number(str[loc[hi]]) !== 10){
				return false;
			}else{
				weHaveThreeQuestionMarks = true;
			}
		}
		lo++;
		hi++;
	}
	return weHaveThreeQuestionMarks;
}
   
function isThereThreeQuestionMarks(arr, start, end){
	let count = 0;
	for(let i = start + 1; i < end; i++){
		if(arr[i] === '?'){
			count++;
		}
	}
	return count === 3;
}

function numberLocations(arr){
	const numberLocations = [];
	for(let i = 0; i < arr.length; i++){
		if(!isNaN(arr[i])){
			numberLocations.push(i);
		}
	}
	return numberLocations;
}
// const str = "aa6?9"
const str = "acc?7??sss?3rr1??????5";
str[4];
str[11];
console.log(numberLocations(str));
console.log(isThereThreeQuestionMarks(str, 4, 11));
console.log(QuestionsMarks(str));
