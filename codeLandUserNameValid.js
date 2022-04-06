/*Have the function CodelandUsernameValidation(str) take the str parameter being passed and determine if the string is a valid username according to the following rules:

1. The username is between 4 and 25 characters.
2. It must start with a letter.
3. It can only contain letters, numbers, and the underscore character.
4. It cannot end with an underscore character.

If the username is valid then your program should return the string true, otherwise return the string false.
Examples
Input: "aa_"
Output: false
Input: "u__hello_world123"
Output: true */
function CodeLandUserNameValidation(str) {
  const regex = /^[A-Za-z]\w{2,23}[^_]$/gm;
  return regex.test(str);
}

const str = "u__hello_worldsadfsadf123";
console.log(CodeLandUserNameValidation(str));
const str1 = "aa_";
console.log(CodeLandUserNameValidation(str1));
const str2 = "1adsfafa";
console.log(CodeLandUserNameValidation(str2));
const str3 = "fre";
console.log(CodeLandUserNameValidation(str3));
