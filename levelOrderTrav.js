class TreeNode {
    constructor(val, left, right) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
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

postOrderTraversal(first);

inOrderTraversal(first);

levelOrderArr = []
console.log(levelOrder(first))

function levelOrder(root) {
    if(!root) return [];
    const results = [];
    const queue  = [root];

    while(queue.length){
        const currentLevelValues = [];
        let currentLevelLength = queue.length;

        for(let i = 0; i < currentLevelLength; i++){
            const node = queue.shift();
            currentLevelValues.push(node.val);
            
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
        results.push(currentLevelValues);
    }
    return results;
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