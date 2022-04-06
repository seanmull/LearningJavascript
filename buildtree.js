class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

let first = new TreeNode(6);
second = new TreeNode(2);
third = new TreeNode(8);
fourth = new TreeNode(0);
fifth = new TreeNode(4);
sixth = new TreeNode(3);
seventh = new TreeNode(5);
eigth = new TreeNode(7);
ninth = new TreeNode(9);

first.left = second;
first.right = third;
second.left = fourth;
second.right = fifth;
fifth.left = sixth;
fifth.right = seventh;
third.left = eigth;
third.right = ninth;

inOrderTraversal(first);
const preorder = [3, 9, 20, 15, 7];
const inorder = [9, 3, 15, 20, 7];

console.log(buildTree(preorder, inorder));

function buildTree(preorder, inorder) {
  if (preorder.length === 0 || inorder.length === 0) return null;

  const root = new TreeNode(preorder[0]);
  const mid = inorder.indexOf(preorder[0]);
  root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
  root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
  return root;
}

function inOrderTraversal(node) {
  if (node === null) return;
  inOrderTraversal(node.left);
  console.log(node.val);
  inOrderTraversal(node.right);
}
