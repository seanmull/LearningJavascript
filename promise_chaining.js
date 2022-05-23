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


new Promise((resolve) => {
  resolve(1)
})
  .then((result) => {
    console.log(result)
    return result * 3
  })
  .then((result) => {
    console.log(result)
    return result - 1
  })
  .then((result) => {
    console.log(result)
    return
  })
  .then(() => {
    console.log(result)
  })


//1, 3, 1
