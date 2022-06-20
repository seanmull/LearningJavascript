class TreeNode {
    constructor(val, left, right) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

let first = new TreeNode(4);
let second = new TreeNode(2);
let third = new TreeNode(1);
let fourth = new TreeNode(3);
let fifth = new TreeNode(7);
let sixth = new TreeNode(6);
let seventh = new TreeNode(9);

//       4
//   2      7 
// 1   3  6   9

//inorder 1 2 3 4 6 7 9
first.left = second;
first.right = fifth;
second.left = third;
second.right = fourth;
fifth.left = sixth;
fifth.right = seventh

let invertTree = (root) => {
    if (root !== null) {
        [root.left, root.right] = [root.right, root.left]
        invertTree(root.left);
        invertTree(root.right);
    }
    return root;
}

function inOrderTraversal(node) {
    if (node === null) return;
    inOrderTraversal(node.left);
    console.log(node.val);
    inOrderTraversal(node.right);
}

//       4
//   2      7 
// 1   3  6   9

//      4
//  7       2
// 9  6   3   1

// call stack
//   
//  null 
// 
//  

function postOrderTraversal(node) {
    if (node === null) return;
    postOrderTraversal(node.right);
    console.log(node.val);
    postOrderTraversal(node.left);
}

console.log("In order traversal before inversion")
inOrderTraversal(first);
invertTree(first);
console.log("In order traversal after inversion")
inOrderTraversal(first);


