
class TreeNode {
    constructor(val, left, right) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

let first = new TreeNode(3);
let second = new TreeNode(4);
let third = new TreeNode(5);
let fourth = new TreeNode(1);
let fifth = new TreeNode(2);

let sixth = new TreeNode(4);
let seventh = new TreeNode(1);
let eigth = new TreeNode(2);

first.left = second;
first.right = third;
second.left = fourth;
second.right = fifth;

sixth.left = seventh;
sixth.right = eigth;

postOrderTraversal(sixth);
inOrderTraversal(sixth);

console.log(isSubtree(first, sixth))
console.log(isSameTree(second, sixth))

function isSubtree(root, subRoot) {
    if(root === null) return false  
    if(isSameTree(root, subRoot)) return true
    return isSubtree(root.left, subRoot) &&
           isSubtree(root.right, subRoot)
}

function isSameTree(p, q) {
    if (!p && !q) return true;
    if (!p) return false;
    if (!q) return false;
    return p.val === q.val &&
        isSameTree(p.left, q.left) &&
        isSameTree(p.right, q.right);
}

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
