const array = ['h', 'e', 'w', "o"];
let str = "hello world";

function removeCharactersFromString(array, str){
    for(const ele of array){
        let regex = new RegExp(ele, "g");
        str = str.replace(regex, "");
    }
    return str;
}

console.log(removeCharactersFromString(array,str));
