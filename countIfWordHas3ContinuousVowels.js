function doesWordHave3Vowels(word){
    const array = [...word.matchAll(/[aeiou]/g)];
    return array.length >= 3;
}

function countWordsThatHave3VowelsOrMoreInText(text){
    let count = 0;
    for(const word of text.split(" ")){
        if(doesWordHave3Vowels(word)) {
            count++;
            word
        }
    }
    return count++;
}

console.log(doesWordHave3Vowels("aaaaaaaaa"))
console.log(countWordsThatHave3VowelsOrMoreInText(
    "This challenge will require us to take a string, separate it into words, and then loop through the word and count how many words have at least 3 vowels. This will require us to first convert a string into an array of words, then loop through that array and for each word loop through its characters an determine how many vowels exist in it and whether or not they are all adjacent to each other. There are two ways we can count the number or vowels within a word:"
));