array = [2, 4, 6, 8];

//putting diff in for loop to keep it local
//pulling from previous values
arithmetic = true;
for (let i = 2, diff = array[1] - array[0]; i < array.length; i++) {
    diff
    console.log(array[i-1])
    console.log(array[i])
    if (array[i] - array[i - 1] !== diff) {
        arithmetic = false;
    }
}

console.log(arithmetic);

//0-1 Knapsack for masking
const word = "word"
const combos = [];
for(let i = 0, max = Math.pow(2, word.length); i < max; i++){
    let num = i.toString(2);
    num
    while (num.length < word.length){
        num = '0' + num;
    }
    combos.push(num);
}
//Another loop to do the masking
combos

//Interesting implementation using map
function countingMinutesI(str) {
    let times = str.split('-');
    times

    times = times.map(function(currentValue, index, array) {
        times
        currentValue
        index
        array
        let pairs = currentValue.split(':');
        pairs
        let time =
            (pairs[1][2] === 'a'
                ? parseInt(pairs[0]) % 12
                : (parseInt(pairs[0]) % 12) + 12) *
                60 +
            parseInt(pairs[1][0] + pairs[1][1]);
            console.log(pairs[1][0])
            console.log(pairs[1][1])
            time
        return time;
    });

    times

    let diff = times[1] - times[0];
    return diff < 0 ? diff + 1440 : diff;
}

console.log(countingMinutesI("9:45am-10:00am"))

//Way to default to empty string if empty
let str = "hello";
let newString = str[0] || "";
newString

//Ways to regex
let validCharacters =
'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
console.log(validCharacters.includes('a'));
console.log(validCharacters.includes('-'));
console.log(("a".search(/[A-Za-z0-9]/)) !== -1);
console.log(("a".search(/A-Za-z0-9]/)) !== -1);

let str1 = "32x = 8 (mod 4)";
const [, a, b, m] = str1
        .match(/([\d]+)x[ ]+=[ ]+([\d]+)[ ]+\(mod ([\d]+)\)/)
        .map(Number);

a
b
m

//use of foreach
function lruCache(strArr) {
    strArr
    const CACHE_MAX = 5;
    let cache = [];
    strArr.forEach(function(element, index) {
        let found = cache.indexOf(element);
        element
        found
        console.log(cache.length)
        cache
        //if not found
        if (cache.length < CACHE_MAX && found === -1) {
            cache.push(element);
            return;
        }
        //if found
        if (found !== -1) {
            cache
            cache.push(cache.splice(found, 1)[0]);
            return;
        }
        //if not found and at max limit
        cache.push(element);
        cache.shift();
    });
    cache
    return cache.join('-');
}

const cache = ["A", "B", "C", "D", "A", "E", "D", "Z"];
console.log(lruCache(cache));


