/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
// Helper Func
const isOutOfBound = (board, row, col) => row < 0 || row >= board.length || col < 0 || col >= board[0].length;

const dfs = (board, word, row, col) => {
    // Check exit conditions
    if (!word.length) return true;
    if (isOutOfBound(board, row, col) || board[row][col] !== word[0]) return false;
    
    // Save some stuff
    const curChar = board[row][col];
    const newWord = word.substr(1);

    board[row][col] = 0; // Disable the current character
    
    // Check if neighbors are fruitful
    const results = dfs(board, newWord, row + 1, col) ||
        dfs(board, newWord, row - 1, col) ||
        dfs(board, newWord, row, col + 1) ||
        dfs(board, newWord, row, col - 1);

    // Enable current character
    board[row][col] = curChar;

    return results;
};


var exist = function(board, word) {    
    for (let row = 0; row < board.length; row++) {
        for (let col  = 0; col < board[0].length; col++) {
            if (dfs(board, word, row, col)) return true;
        }
    }
    return false;
};
