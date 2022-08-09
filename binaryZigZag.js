/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// let one = null
let one = new TreeNode();
let two = new TreeNode(9);
let three = new TreeNode(20);
let four = new TreeNode(15);
let five = new TreeNode(7);
let six = new TreeNode(8);
let seven = new TreeNode(19);
let nine = new TreeNode(90);
one.left = two;
one.right = three;
three.left = four;
three.right = five;
four.left = six;
four.right = seven;
five.left = nine;

var zigzagLevelOrder = function (root) {
  if (root === null) return [];
  let c = root,
    q = [c],
    r = [],
    l,
    f,
    len,
    flag = true;
  while (q.length !== 0) {
    len = q.length;
    l = [];
    for (let i = 0; i < len; i++) {
      f = q.shift();
      l.push(f.val);
      if (f.left !== null) q.push(f.left);
      if (f.right !== null) q.push(f.right);
    }
    if (flag) {
      r.push(l);
      flag = false;
    } else {
      r.push(l.reverse());
      flag = true;
    }
  }
  return r;
};

console.log(zigzagLevelOrder(one));
