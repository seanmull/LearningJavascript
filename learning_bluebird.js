let Promise = require('bluebird')

new Promise.resolve([])
  .then((result) => {
    result.push("something")
    console.log(result)
    return result
  })
  .then((result) => {
    result.push("something else")
    console.log(result)
    return result
  })
  .spread((firstElement, secondElement) => {
    console.log(firstElement)
    console.log(secondElement)
    return [firstElement, secondElement]
  }).then(([f, s] = result) => {
    console.log(f)
    console.log(s)
  })



