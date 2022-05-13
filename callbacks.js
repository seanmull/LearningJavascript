function loadSomeLongRunningScript() {
  // setTimeout(() => {
  console.log("something long running")
  // }, 1000)
}

function loadSomeQuickRunningScript() {
  console.log("something quick running")
}

// without callbacks we cannot order this right if we want long to run before quick
// loadSomeLongRunningScript(loadSomeQuickRunningScript)
// loadSomeQuickRunningScript()

new Promise((resolve, reject) => {
  //Producing code
  resolve("success")
  reject("failure")
}).then(
  //Consuming code
  function(value) { console.log(value) },
  function(error) { console.log(error) }
)


new Promise((resolve, reject) => {
  //Producing code
  resolve("success")
  reject("failure")
}).then(
  //Consuming code
  loadSomeLongRunningScript()
).then(
  loadSomeQuickRunningScript()
)

