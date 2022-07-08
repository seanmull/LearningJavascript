function numIslands(grid){
  const height = grid.length
  const width = grid[0].length
  let count = 0
  const dfs = (row, column) => {
    if(row < 0 ||
       column < 0 ||
       row === height ||
       column === width){
      return
    }

    if(grid[row][column] === '0'){
      return
    }

    grid[row][column] = '0'
    dfs(row - 1, column)
    dfs(row + 1, column)
    dfs(row, column - 1)
    dfs(row, column + 1)
  }

  for(let row = 0; row < height; row++){
    for(let column = 0; column < width; column++){
      if(grid[row][column] === "0"){
        continue
      }
      count++
      dfs(row, column)
    }
  }
  return count

}

let grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]

console.log(numIslands(grid))
