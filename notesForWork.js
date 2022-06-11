// add two objects

let obj1 = {
  'something': 1
}

let obj2 = {
  'something1': 3
}

console.log("something2".includes("something"))
// console.log(obj1 & obj2)

const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sqlite::memory:");

const User = sequelize.define('User', {

    firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },

    lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
      }
}, {
      // Other model options go here
  });
// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

const jane = User.build({ firstName: "Jane" });

console.log(jane instanceof User); // true

console.log(jane.firstName); // "Jane"
