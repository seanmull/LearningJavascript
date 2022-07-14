//Input = [1,3,1,2,4,6]
//Output =[3,4,2,4,6,-1]

// i = 2
// Brute force
// let nextHighest = (arr) => {
//   let results = []
//   let j
//   for(let i = 0; i < arr.length; i++){
//     let highest = undefined
//     j = i + 1
//     while(j < arr.length){
//       if(arr[j] > arr[i]){
//         highest = arr[j]
//         break
//       }
//       j++
//     }
//     if(!highest){
//       highest = -1
//     }
//     results.push(highest)
//   }
//   return results
// }



//Input = [1,3,1,2,4,6]
//More optimal solution
let nextHighest = (arr) => {
  let l = 0, r = 1
  let queue = [arr[1]] // 1, 2, 4
  let results = [] // 3

//Input = [1,3,1,2,4,6]
//Output =[3,4,2,4,6,-1]
  while(l < arr.length){
    let front = queue[0]
    let back = queue[queue.length - 1]
    // check if right is out of bounds
    if(r > arr.length){
      results.push(-1)
      queue.shift(); l++; r = l;
    }
    // this front back queue stuff is incorrect since
    // it doesn't check whats in the middle
    // check front of queue
    else if(front > arr[l]){
      results.push(front)
      queue.shift(); l++; r = l;
    }
    // check back of queue
    else if(back > arr[l]){
      results.push(back)
      queue.shift(); l++; r = l;
    }
    r++;
    queue.push(arr[r])
  }
  return results
}



//Input = [1,3,1,2,4,6]
//Output =[3,4,2,4,6,-1]
//3,4,6,-1,6,-1
console.log(nextHighest([1,3,1,2,4,6]))

