

/**
 * @param {number[]} cells
 * @param {number} n
 * @return {number[]}
 */
var prisonAfterNDays = function(cells, n) {
  mod = 2 * (cells.length - 1)
  n = n % mod !== 0 ? n % mod : mod
  let a;
  for(let day = 0; day < n; day++){
    a = Array(8).fill(0)    
    for(let cell = 1; cell < 7; cell++){
      if((cells[cell- 1] === 0 && cells[cell+ 1] === 0) ||
        (cells[cell- 1] === 1 && cells[cell+ 1] === 1)){
        a[cell] = 1
      }
    }
    cells = a
  }
  return a
};

// console.log(prisonAfterNDays([0,1,0,1,1,0,0,1], 7))
// console.log(prisonAfterNDays([1,0,0,1,0,0,1,0], 1000000000))
console.log(prisonAfterNDays([1,1,0,1,1,0,0,1], 300663720))
