// function dashinsert(str){
//     let newString = str[0] || "";

//     for(let i = 1, lastNumberIsOdd = str[0] % 2 === 1; i< str.length; i++){
//         const numberIsOdd = str[i] % 2 === 1;

//         newString += numberIsOdd && lastNumberIsOdd ? "-" + str[i] : str[i];

//         lastNumberIsOdd = numberIsOdd;
//         newString

//     }

//     return newString;
// }

function dashinsert(str) {
  if (str.length === 0) return "";
  let dashedString = str[0];
  let wasOddnum = str[0] % 2 === 1;

  for (let i = 1; i < str.length; i++) {
    const OddNum = str[i] % 2 === 1;
    if (OddNum && wasOddnum) {
      dashedString += "-" + str[i];
    } else {
      dashedString += str[i];
    }
    wasOddnum = OddNum;
  }

  return dashedString;
}



const dashedInsert = (str) => {
  let arr = str.split("")
  for(let i = 0; i < arr.length - 1; i++){
    if(arr[i] % 2 !== 0 && arr[i + 1] % 2 !== 0){
      arr[i] += "-"
    }
  }
  return arr.join("")
}
const dashedInsert2 = (str) => {
  let arr = str.split("")
  let [first, second] = [0, 1]
  while(second < arr.length){
    if(arr[first] % 2 !== 0 && 
       arr[second] % 2 !== 0){
      arr[first] += "-"
    }
    first++; second++;
  }
  return arr.join("")
}
console.log(dashedInsert("454793"))
console.log(dashedInsert2("454793"))
console.log(dashinsert("454793"));
