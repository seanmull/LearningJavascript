class TreeNode {
    constructor(val, left, right) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

first = new TreeNode(5);
second = new TreeNode(1);
third = new TreeNode(4);
fourth = new TreeNode(3);
fifth = new TreeNode(6);

first.left = second;
first.right = third;
third.left = fourth;
third.right = fifth;

inOrderTraversal(first);

console.log(isValidBST(first))

function isValidBST(root){
    return isValidBSTHelper(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
}

function isValidBSTHelper(root, lo, hi)
{
    if(!root) return true;
    if(!isBetween(root.val, lo, hi)) return false;
    return isValidBSTHelper(root.left, lo, root.val) &&
           isValidBSTHelper(root.right, root.val, hi);
}

function isBetween(val, lo, hi){
    return (val > lo && hi > val);
}



function inOrderTraversal(node){
    if(node === null) return;
    inOrderTraversal(node.left);
    console.log(node.val);
    inOrderTraversal(node.right);
}
