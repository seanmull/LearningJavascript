function combinationGenerator(word){
    const numberToIterateUpTo = Math.pow(2, word.length);
    const listOfCombinations = [];
    for(let binaryNum = 0; binaryNum < numberToIterateUpTo; binaryNum++){
        let wildCardString = provideWildCardString(binaryNum,word);
        listOfCombinations.push(wildCardString);
    }
    return listOfCombinations;
}

function provideWildCardString(binaryNum, word){
        let index = 0;
        while(binaryNum != 0){
            if(binaryNum & 1 === 1) word = word.replaceAt(index, "*");
            binaryNum >>= 1; 
            index++;
        }
        return word;
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

console.log(combinationGenerator("word"));