/**
 * @param {number[][]} isConnected
 * @return {number}
 */


var findCircleNum = function(isConnected) {
    let isVisited = Array(isConnected.length).fill(false)
    
    let traverse = (city) => {
        isVisited[city] = true
        for(let i = 0; i < isConnected[city].length; i++){
            if(isConnected[city][i] === 1 && !isVisited[i]){
                traverse(i)
            }
        }
    }
    let count = 0
    for(let i = 0; i < isConnected.length; i++){
        if(!isVisited[i]){
            traverse(i)
            count++
        }
    }
    return count
};
