const f = (something) => {
  console.log(something.toString())
}

// f(5)

const willTheDuckCrossTheRoad = (isRoadCrossed) => {
  const x = 1;
  return new Promise((resolve, reject) => {
    // This only will produce code
    // resolve(`The duck has crossed and ${x}`);
    reject(new Error("The duck has not crossed"))
  }).then((result) => {
      // This is only for consumption
      console.log(result)
  }).catch((error) => {
      // console.log("something else")
      console.log(error)
  }).finally(() => {
      console.log("The has finished")
  })
}

willTheDuckCrossTheRoad(false)
// willTheDuckCrossTheRoad(false)
