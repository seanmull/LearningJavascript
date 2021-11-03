/*Have the function BracketCombinations(num) read 
num which will be an integer greater than or equal to zero, 
and return the number of valid combinations that can be formed 
with num pairs of parentheses. For example, if the input is 3, 
then the possible combinations of 3 pairs of parenthesis, 
namely: ()()(), are ()()(), ()(()), (())(), ((())), and (()()). 
There are 5 total combinations when the input is 3, so your program should return 5. */

function BracketCombinations(num){

    return num;
}

function validateBrackets(str){
    const stack = [];
    for(const c of str){
        if(c === "(")
            stack.push("(");
        else if(c === ")" && stack.length === 0)
            return false;
        else
            stack.pop();
    }
    return stack.length === 0;
}

function generateBrackets(num){
    
}

console.log(validateBrackets("()"));
console.log(validateBrackets("(()"));
console.log(validateBrackets("()("));
console.log(validateBrackets("()()"));

console.log(BracketCombinations(3));