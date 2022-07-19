/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */

let findOneOff = (word1, word2) => {
    let count = 0
    for(let i = 0; i < word1.length; i++){
        if(count > 1) return false
        if(word1[i] !== word2[i]) count++
    }
    return count <= 1
}



var ladderLength = function(beginWord, endWord, wordList) {
    let isVisited = new Set([beginWord])
    let queue = [beginWord]
    let trans = 1
    while(queue.length !== 0){
        let nextState = []
        for(let word of queue){
            if(word === endWord) return trans
            for(let i = 0; i < wordList.length; i++){
                if(!isVisited.has(wordList[i]) && findOneOff(word, wordList[i])){
                    isVisited.add(wordList[i])
                    nextState.push(wordList[i])  
                }
            }
        }
        queue = nextState
        trans++
    } 
    return 0
};
