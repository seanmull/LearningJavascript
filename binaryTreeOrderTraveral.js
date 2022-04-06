class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

first = new TreeNode(3);
second = new TreeNode(9);
third = new TreeNode(20);
fourth = new TreeNode(15);
fifth = new TreeNode(7);

first.left = second;
first.right = third;
third.left = fourth;
third.right = fifth;

// postOrderTraversal(first);

// inOrderTraversal(first);

levelOrder(first);

levelOrderArr = [];

function levelOrder(root) {
  if (root === null) {
    // console.log(null);
    return;
  }
  level = [];
  left = levelOrder(root.left);
  right = levelOrder(root.right);
  level = [left, right];
  levelOrderArr.push(level);
}

levelOrderArr;

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
