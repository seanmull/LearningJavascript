/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function(matrix) {
    let r = matrix.length + 1
    let c = matrix[0].length + 1
    let dp = Array(r).fill(Array(c).fill(0))
    let ml = 0
    for(let i = 1; i < r - 1; i++){
        for(let j = 1; j < c -1; j++){
            if(matrix[i - 1][j - 1] === "1"){
                dp[i][j] = Math.min(
                           dp[i - 1][j],
                           dp[i - 1][j - 1],
                           dp[i][j - 1]) + 1
            }
            ml = Math.max(ml, dp[i][j])
            
        }
    }
    return ml * ml
};
