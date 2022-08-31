// new Promise((resolve, reject) => {
//   console.log('Initial');
//   resolve();
// })
//   .then(() => {
//     throw new Error('Something failed');
//     console.log('Do this');
//   })
//   .catch(() => {
//     console.error('Do that');
//   })
//   .then(() => {
//     console.log('Do this, no matter what happened before');
//   });

// const { resolve } = require("bluebird")


// new Promise((resolve) => {
//   setTimeout(() => {
//     resolve(1)
//   }, 1000)
// })
//   .then((result) => {
//     console.log(result)
//     return result * 3
//   })
//   .then((result) => {
//     console.log(result)
//     return result - 1
//   })
//   .then((result) => {
//     console.log(result)
//     return
//   })
//   .then((result) => {
//     console.log(result)
//   })

//1, 3, 1

let x
let longrunningprocess = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(8)
    },1000)
  }).then((result) => {
      return result
  })
}

// // do the async way
const getX = async() => {
  // this is the key
  x = await longrunningprocess()
  console.log(x)
}

// do the promise way
// const getX = () => {
  // this is the key
  // return longrunningprocess().then((a) => (a))
// }
getX()


