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

function dashinsert(str){
    if(str.length === 0) return "";
    let dashedString = str[0];
    let wasOddnum = str[0] % 2 === 1;

    for(let i = 1 ; i< str.length; i++){
        const OddNum = str[i] % 2 === 1;
        if(OddNum && wasOddnum){
            dashedString += "-" + str[i];
        }else{
            dashedString += str[i];

        }
        wasOddnum = OddNum;
    }

    return dashedString;
}
console.log(dashinsert("454793"));