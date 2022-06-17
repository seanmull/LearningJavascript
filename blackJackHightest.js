let arr = ["two", "three", "ace", "king"]
let arr1 = ["two", "three", "ace"]

const blackjackHighest = (arr) => {
  const cards = {
    "ace": { "name": "ace", "score": 1, "rank": 1 },
    "two": { "name": "two", "score": 2, "rank": 2 },
    "three": { "name": "three", "score": 3, "rank": 3 },
    "four": { "name": "four", "score": 4, "rank": 4 },
    "five": { "name": "five", "score": 5, "rank": 5 },
    "six": { "name": "six", "score": 6, "rank": 6 },
    "seven": { "name": "seven", "score": 7, "rank": 7 },
    "eight": { "name": "eight", "score": 8, "rank": 8 },
    "nine": { "name": "nine", "score": 9, "rank": 9 },
    "ten": { "name": "ten", "score": 10, "rank": 10 },
    "jack": { "name": "jack", "score": 10, "rank": 11 },
    "queen": { "name": "queen", "score": 10, "rank": 12 },
    "king": { "name": "king", "score": 10, "rank": 13 },
  }

  const getCards = () => {
    const arrOfCards = arr.map((row) => cards[row])
    const indexOfAce = arr.indexOf("ace")
    const getCurrentScore = arrOfCards.map((card) => card.score).reduce((x, y) => x + y)

    if (indexOfAce !== -1 && getCurrentScore <= 11) {
      arrOfCards[indexOfAce].score += 10
      arrOfCards[indexOfAce].rank = 14
    }
    return arrOfCards
  }
  const currentCards = getCards()
  const highestScore = Math.max(...currentCards.map((card) => card.rank))
  return currentCards.filter((card) => card.rank === highestScore)[0].name
}

console.log(blackjackHighest(arr)) //"king"
console.log(blackjackHighest(arr1)) //"ace"

