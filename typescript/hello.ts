// we can infer from a that is its type
// just hover over a
let a = "a";
console.log(a);

// say we have an object we want to have types for
const b = {
  name: "sean",
  id: 0,
  doSomething: function say(something: string) {
    return something;
  },
};

console.log(b.name);
console.log(b.id);
console.log(b.doSomething("hello"));

// building an interface allows explictly indicated types
interface User {
  name: string;
  id: number;
  doSomething: Function;
}

const c: User = {
  // If we put a number here it will throw a type error
  name: "sean",
  id: 0,
  doSomething: function say(something: string) {
    return something;
  },
};

// This similar type syntax can be applied to classes
interface newUser {
  name: string;
  id: number;
}

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user: newUser = new UserAccount("Murphy", 1);

console.log(user.name);
console.log(user.id);

// function a(): User  for return values
// function a(user: User) for param values

// typescript has some addtional types
// any: too allow anything
// unknown: ensures that the user ensures what type this is
// never: not possible to type could happen
// void: doesn't return anything or undefined
type Mybool = true | false;
let x: Mybool = true;
type onlyAnOddNumber = 1 | 3 | 5 | 7 | 9;
let y: onlyAnOddNumber = 3;

let allowdifferentTypes = (a: string | string[]): string[] => {
  if (typeof a === "string") {
    return [a];
  }
  return a;
};

type gen<T> = Array<T>;
// this will produce type array since the above line insures that all are the type that gets passed in
// let allArray: gen<number> = ["1", 2, 3];

// type system will only check
interface Point {
  x: number;
  y: number;
}

let logPoint = (p: Point) => {
  console.log(`${p.x}, ${p.y}`);
};

const point = { x: 12, y: 26 };
logPoint(point);

// will not print 13
const point1 = { x: 12, y: 26, z: 13 };
logPoint(point1);

const point2 = {};
// will throw type error
// logPoint(point2);
