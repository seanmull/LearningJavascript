/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (digits.length === 0) return [];
  let results = [];
  let stack = digits.split("");

  let map = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
  };

  let getCombo = (i, pre) => {
    // base case
    if (i === digits.length) {
      results.push(pre);
      return;
    }
    let post = map[digits[i]];
    for (let j = 0; j < post.length; j++) {
      //recursive case
      getCombo(i + 1, pre + post[j]);
    }
  };
  getCombo(0, "");
  return results;
};
