function LongestWord(sen){
    const words = sen.split(" ");
    const wordLengths = words.map(word => counterLetters(word));
    const maxLength = Math.max(...wordLengths);
    const maxIndex = wordLengths.indexOf(maxLength);
    return words[maxIndex];
}

function counterLetters(word){
    const regex = /[A-Z]/gi;
    return word.match(regex).length
}

const sen = "Have the function LongestWord(sen) take the sen parameter being passed and return the longest word in the string. If there are two or more words that are the same length, return the first word from the string with that length. Ignore punctuation and assume sen will not be empty. Words may also contain numbers, for example \"Hello world123"
console.log(LongestWord(sen));
console.log(counterLetters("hello"))
console.log(counterLetters("he1llo"))
console.log(counterLetters("hel*o"))
console.log(counterLetters("he^lo"))
