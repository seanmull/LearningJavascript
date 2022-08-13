class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

let first = new TreeNode(3);
let second = new TreeNode(9);
let third = new TreeNode(20);
let fourth = new TreeNode(15);
let fifth = new TreeNode(7);

first.left = second;
first.right = third;
third.left = fourth;
third.right = fifth;

// postOrderTraversal(first);

// inOrderTraversal(first);

const levelOrderArr = Array();

function levelOrder(root) {
  if (root === null) {
    // console.log(null);
    return;
  }
  let level = [];
  let left = levelOrder(root.left);
  let right = levelOrder(root.right);
  level = [left, right];
  levelOrderArr.push(level);
}

console.log(levelOrder(first));

function inOrderTraversal(node) {
  if (node === null) return;
  inOrderTraversal(node.left);
  console.log(node.val);
  inOrderTraversal(node.right);
}

function postOrderTraversal(node) {
  if (node === null) return;
  postOrderTraversal(node.right);
  console.log(node.val);
  postOrderTraversal(node.left);
}
