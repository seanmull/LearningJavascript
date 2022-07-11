var _ = require('lodash')

_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 });

_.join(['a', 'b', 'c'], '~');

//pickby
_.pickBy({ 'a': 1, 'b': 2 }, (value, key) => key === 'a')

//chain
console.log(
  _.chain(['a', 'b', 'c']).map((l) => l.toUpperCase()).join(",").value()
)

//get
let arr = [0, 1, 2, [3, [4]]]
console.log(
  _.get(arr, [3, 1, 0])
)
console.log(
  _.get(arr, '[3][1][0]')
)

//cloneDeep
let obj = { 'a': 1, 'b': 2 }
let obj2 = obj
console.log(obj === obj2)
let obj3 = _.cloneDeep(obj)
console.log(obj === obj3)

//compact
_.compact([0, 1, undefined, 'sdfadf', '', [1, 2, 3], [], true, false])

//concat
let a = [1, 2, 3]
let b = [1, [2]]
_.concat(a, b)

//each
_.forEach([1, 2], (e) => console.log(e))

//extend

//isEmpty
_.isEmpty(null)
_.isEmpty([1])

//set
let x = [1, 2, 3, 4]
_.set(x, [6, 1], 6)
_.set(x, '[6][1]', 6)

//partialRight
//difference
let y = [1, 2, 3, 4, 10]
let z = [1, 2, 3, 4, 5]

_.difference(z, y)
_.difference(y, z)

//find
let users = [
  { "name": "sam", "sex": "male" },
  { "name": "lil", "sex": "female" }
]

_.find(users, (user) => user.name === "sam")

//isEqual
let c = [1, 2]
let d = [1, 2]

_.isEqual(c, d)
c === d

//uniqBy
_.uniqBy([1, 2, 1, 2, 3])
_.uniqBy([{ 'x': 1 }, { 'y': 2 }], 'x')

//defaultsdeep
let config = {
  "a": 1,
  "b": 2,
}

let AppOnlyConfig = {
  "a": 8,
  "b": 4,
  "c": 3,
}

let SkeletorOverridesConfig = {
  "b": 2,
  "d": 5
}

let base = {
  "e": 0,
  "f": 7,
}

_.defaultsDeep(config, AppOnlyConfig, SkeletorOverridesConfig, base)
config
