class TreeNode {
    constructor(val, left, right) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

first = new TreeNode(1);
second = new TreeNode(2);
third = new TreeNode(3);
fourth = new TreeNode(1);
fifth = new TreeNode(2);
sixth = new TreeNode(3);

first.left = second;
first.right = third;
fourth.left = fifth;
fourth.right = sixth;

inOrderTraversal(first);
inOrderTraversal(fourth);

var isSameTree = function(p, q){
    if(p === null && q === null) return true;
    if(p === null) return false;
    if(q === null) return false;
    return p.val === q.val &&
           isSameTree(p.left, q.left) &&
           isSameTree(p.right, q.right);
}

console.log(isSameTree(first, fourth));

function inOrderTraversal(node){
    if(node === null) return;
    inOrderTraversal(node.left);
    console.log(node.val);
    inOrderTraversal(node.right);
}
