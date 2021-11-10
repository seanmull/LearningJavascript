
let i = 0;

while(i < 10){
  console.log('Number' + i);
  i++;
}

let y = 100;

do{
  console.log('Number' + y);
  y++;
}while(y < 104);

const car = ['Ford', 'Chevy', 'Honda', 'Toyota'];

car.forEach(function(car,index,array) {
  console.log(`${index}:${car}`);
  console.log(array);
});

const users = [
  {id: 1, name: 'John'},
  {id: 2, name: 'Sara'},
  {id: 3, name: 'Karen'},
  {id: 4, name: 'Steve'},
];

const id = users.map(u => u.id)
id

const user = {
  firstName: 'John',
  lastName: 'Doe',
  age: 40
}

for(let x in user){
  console.log(`${x} ${user[x]}`)
}

interavals = [[2,6],[1,3],[8,10],[15,18]]

interavals.sort((a,b) => a[0] - b[0])
interavals

mergedIntervals = interavals[0];
mergedIntervals

for(let interval in interavals){
  console.log(interval)
}