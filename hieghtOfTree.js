
class TreeNode {
    constructor(val, left, right) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
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

inOrderTraversal(first);

var maxDepth = function(root){
    if(root === null) return 0;
    return 1 + Math.max(maxDepth(root.right), maxDepth(root.left));
}

console.log(maxDepth(third))

function inOrderTraversal(node){
    if(node === null) return;
    inOrderTraversal(node.left);
    console.log(node.val);
    inOrderTraversal(node.right);
}
