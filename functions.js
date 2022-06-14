function greet(firstName = 'John' , lastName = 'Doe'){
  return `Hello ${firstName} ${lastName}` 
};

console.log(greet())

const square = function(x = 3){
  return x * x;
}

console.log(square(342));
console.log(square());

(function(){
  console.log("IIFE Ran...")
})();

const x = 1
const y = 2

const add = ((x, y) => x + y)(x, y);

console.log(add)

const spotifyList = "S23498274982"
const songs = ["3234F", "1231A"]

const querystring = songs.map((song) => `('${spotifyList}', '${song}, NOW(), NOW())`
  ).join(" , ")

console.log(querystring)

