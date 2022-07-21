let grid = [[2,1,1],[1,1,0],[0,1,1]]


var orangesRotting = function(grid){
  let h = grid.length, w = grid[0].length
  let rotten = []
  let fresh = 0
  for(let r = 0; r < h; r++){
    for(let c = 0; c < w; c++){
      if(grid[r][c] === 2){
        rotten.push([r,c])
      }
      if(grid[r][c] === 1){
        fresh++
      }
    }
  }

  let m = 0
  while(rotten.length !== 0){
    let len = rotten.length
    for(let i = 0; i < len; i++){
      const [r, c] = rotten.shift()
      //top
      if(r - 1 > -1 && grid[r - 1][c] === 1){
        grid[r - 1][c] = 2
        rotten.push([r - 1, c])
        fresh--
      }
      //bottom
      if(r + 1 < h && grid[r + 1][c] === 1){
        grid[r + 1][c] = 2
        rotten.push([r + 1, c])
        fresh--
      }
      //left
      if(c - 1 > -1 && grid[r][c - 1] === 1){
        grid[r][c - 1] = 2
        rotten.push([r, c - 1])
        fresh--
      }
      //right
      if(c + 1 < w && grid[r][c + 1] === 1){
        grid[r][c + 1] = 2
        rotten.push([r, c + 1])
        fresh--
      }
    }
    if(rotten.length > 0) m++
  }
  return fresh === 0 ? m - 1 : -1
}

console.log(orangesRotting(grid))

