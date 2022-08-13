/*
In a country where everyone wants a boy, 
each family continues having babies till they have a boy.</br>
After a long time, what is the proportion of 
boys to girls in the country? (Assuming probability of having a boy or a girl is the same)
Round off your answer to two decimal places and 
output the answer as I.xx where I is the 
integer part of your answer, and xx is the 
first two decimal places of the rounded-off answer.
*/

let returnProb = (families) => {
  let boys = 0;
  let girls = 0;
  let family = 0;
  // below 0.5 is boy above is girl
  let random = 0;
  while (family < families) {
    random = Math.random();
    if (random > 0.5) {
      girls++;
    } else {
      boys++;
      family++;
    }
  }
  return boys / girls;
};

console.log(returnProb(100));
console.log(returnProb(10000000));
