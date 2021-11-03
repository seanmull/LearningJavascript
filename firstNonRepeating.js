const s = "hello henry";

function firstNonRepeatingChar(s){
    const map = new Map();
    for(const char of s){
        if(map.has(char)){
            const currentNumberOfCharacters = map.get(char);
            map.set(char, currentNumberOfCharacters+1);
        }else{
            map.set(char, 1);
        }
    }
    for(const char of s){
        if(map.get(char) === 1) return char;
    }
    return "";
}

console.log(firstNonRepeatingChar(s));
