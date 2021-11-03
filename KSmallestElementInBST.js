class TreeNode {
    constructor(val, left, right) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

first = new TreeNode(3);
second = new TreeNode(1);
third = new TreeNode(4);
fourth = new TreeNode(2);

first.left = second;
first.right = third;
second.right = fourth;

inOrderTraversal(first);
console.log(inOrderTraversalArr(first, []));
console.log(kthSmallest(first, 1))

function kthSmallest(root, k){
    return inOrderTraversalArr(root, [])[k-1];
}

function inOrderTraversalArr(node, arr){
    if(!node) return arr;
    inOrderTraversalArr(node.left, arr);
    arr.push(node.val);
    inOrderTraversalArr(node.right, arr);
    return arr;
}



function inOrderTraversal(node){
    if(node === null) return;
    inOrderTraversal(node.left);
    console.log(node.val);
    inOrderTraversal(node.right);
}
