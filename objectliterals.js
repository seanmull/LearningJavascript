
const person = {
  firstName : 'Steve',
  lastName : 'Smith',
  age: 36,
  email: 'steve@aol.com',
  hobbies: ['music', 'sports'],
  address: {
    city: 'Miami',
    state: 'FL'
  },
  getBirthYear: function() {
    return 2017 - this.age
  }
}

person
console.log(person.firstName)
console.log(person['lastName'])
console.log(person.age)
console.log(person.hobbies[1])
console.log(person.address.state)
console.log(person.getBirthYear())


const people = [
  {name: 'Mike', age: 23},
  {name: 'John', age: 30},
  {name: 'Nancy', age: 20}
]

for(let i = 0; i < people.length; i++){
  console.log(people[i].name)
}

people.sort((a,b) => (a.name > b.name) ? 1 : -1)
people

people.sort((a,b) => (a.age - b.age))
people