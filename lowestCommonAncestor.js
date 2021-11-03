class TreeNode {
    constructor(val, left, right) {
        this.val = val 
        this.left = left
        this.right = right
    }
}

first = new TreeNode(6);
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

// inOrderTraversal(first);

console.log(lowestCommonAncestor(first, 7, 9));

function lowestCommonAncestor(root, p, q){
    if(p.val < root.val && q.val < root.val)
        return lowestCommonAncestor(root.left, p, q);

    if(p.val > root.val && q.val > root.val)
        return lowestCommonAncestor(root.right, p, q);

    return root.val;
}



function inOrderTraversal(node){
    if(node === null) return;
    inOrderTraversal(node.left);
    console.log(node.val);
    inOrderTraversal(node.right);
}
