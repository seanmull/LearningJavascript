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
