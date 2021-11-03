class TreeNode {
    constructor(val, left, right) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

first = new TreeNode(4);
second = new TreeNode(2);
third = new TreeNode(1);
fourth = new TreeNode(3);
fifth = new TreeNode(7);
sixth = new TreeNode(6);
seventh = new TreeNode(9);

first.left = second;
first.right = fifth;
second.left = third;
second.right = fourth;
fifth.left = sixth;
fifth.right = seventh

postOrderTraversal(first);

invertTree(first);
inOrderTraversal(first);

function invertTree(root) {
    if (root !== null) {
        tmp = root.left;
        root.left = root.right;
        root.right = tmp;
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

function postOrderTraversal(node) {
    if (node === null) return;
    postOrderTraversal(node.right);
    console.log(node.val);
    postOrderTraversal(node.left);
}