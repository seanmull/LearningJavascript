'use strict'

function Tune(song, artist) {
  let title = song
  this.concat = () => {
    return title + " " + artist
  }
}

const tune = new Tune("song", "artist")
console.log(tune.concat())
console.log(tune.title)

//Add properties
Tune.prototype.addCategory = function(song) {
  this.printSong = song
}
tune.addCategory("something")

console.log(
  {
    "Title and artist": tune.concat(),
    "Category": tune.printSong
  }
)

function Book(title, author) {
  this.getTitle = () => `Title: ${title}`
  this.getAuthor = () => `Author: ${author}`
}

function TechBook(title, author, category) {
  this.getCategory = () => `Technical Category ${category}`
  this.getBook = () => `${this.getTitle()} ${author} ${this.getCategory()}`
  Book.apply(this, arguments)
}

TechBook.prototype = Object.create(Book.prototype)
TechBook.prototype.constructor = TechBook

let newBook = new TechBook("Book", "sean mull", "programming")
console.log(newBook.getBook())
console.log(newBook.getTitle())
console.log(newBook.getAuthor())
console.log(newBook.getCategory())

let data = {}

Object.defineProperty(data, 'type', {
  value: 'primary',
  // enumerable: true //uncomment to make in unwritable
  writable: true
})

console.log(data.type)
data.type = 'secondary'
console.log(data.type)


Object.freeze(data)

data.type = "something"
console.log(data.type)

let person = {
  name: "Sean Mull",
  getName: function() {
    console.log(this.name)
  }
}

person
console.log(person.getName())
let f = person.getName.bind(person)
person.getName()


let arr = ["something", "something else"]

let str = arr.map((ele) => {
  return `'${ele}'`
}).join(" , ")
console.log(str)

// let str = '[
//     {"url":"https://cdn.nightlife.com.au/","use_default_speed":true},
//     {"url":"https://144.217.247.192/","use_default_speed":true}
// ]'

const module = {
  x: 42,
  getX: function() {
    return this.x
  }
}

const unboundedGetX = module.getX
//function lost scope of module
console.log(unboundedGetX())

//we bind the function to module so it then has access to local scope
const boundedGetX = unboundedGetX.bind(module)
console.log(boundedGetX())

