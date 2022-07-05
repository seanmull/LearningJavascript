var mostCommonWord = function(paragraph, banned) {
    let bannedSet = new Set(banned.map((word) => word.toLowerCase()))
    let frequencyOfWords = {}

    paragraph.replace(/[^a-zA-Z0-9 ]/g, " ")
             .split(" ")
             .map((word) => word.toLowerCase())
             .filter((word) => !bannedSet.has(word) && word !== "")
             .forEach((word) => {
                 if(word in frequencyOfWords) frequencyOfWords[word]++
                 else frequencyOfWords[word] = 1
    })

    let entries = Object.entries(frequencyOfWords)
    let frequencys = entries.map(ele => ele[1])
    let max = Math.max(...frequencys) 
    let maxIndex = frequencys.indexOf(max)
    return entries[maxIndex][0]
};

console.log(mostCommonWord("Bob. hIt, baLl", ["bob", "hit"])
)

