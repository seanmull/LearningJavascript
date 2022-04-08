// const Cat = { name: "Mino", type: "Cat" };
// const Dog = { name: "Lucy", type: "Dog" };
// const fn = __filename;
// const dn = __dirname;
// module.exports = { Cat, Dog, fn, dn };

const chalk = require("chalk");
module.exports = function (eventEmitter) {
  eventEmitter.on("newUser", (username) => {
    chalk.green("New user has joined the game room", username);
  });
};
