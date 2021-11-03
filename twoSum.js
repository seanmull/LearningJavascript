const array = [1,6,4,3];
const target = 10;

function twoSum(array, target){
   const set = new Set(); 
   for(const ele of array){
       if(set.has(target - ele)) return true;
       set.add(ele);
   }
   return false;
}
console.log("hello world");
console.log(twoSum(array, target));

function add(x,y){
   return x + y;
}

console.log(add(1,2))

function areaOfShape(shapeString, arrayOfParams){
   return arrayOfParams.map(param => {
      if(shapeString == "circle")
         return Math.PI * Math.pow(param, 2);
      if(shapeString == "square")
         return param ** 2;
   });
}


console.log(areaOfShape("circle", [1,2,3]));
