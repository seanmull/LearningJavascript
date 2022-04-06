function greet(firstName = 'John' , lastName = 'Doe'){
  return `Hello ${firstName} ${lastName}` 
};

console.log(greet())

const square = function(x = 3){
  return x * x;
}

console.log(square(342));

(function(){
  console.log("IIFE Ran...")
})();
