const str = "addddeeccedgeeegs";

function removeAllAdjecentChar(str){
    if(str.length === 0) return str;
    let newStr = str[0];
    for(const char of str.substring(1)){
        const currentChar = newStr[newStr.length -1];
        if(char !== currentChar){
            newStr += char;
        }
    }
    return newStr;
}

console.log(removeAllAdjecentChar(str));