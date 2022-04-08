// const events = require("events");
// const EventEmitter = events.EventEmitter;

// let eventEmitter = new EventEmitter();
// eventEmitter.emit("newUser", "sean");

// require("./bootstrap")(eventEmitter);

// let fs = require("fs");
// let rs = fs.createReadStream("./demofile.txt");
// rs.on("open", function () {
//   console.log("The file is open");
// });

const events = require("events");
const eventEmitter = new events.EventEmitter();

let myEventHandler = function () {
  console.log("I can hear a scream");
};

//Assign the event handler to an event
eventEmitter.on("scream", myEventHandler);

//Fire the event
eventEmitter.emit("scream");
