class TreeNode { 
  constructor(val, left, right) { 
    this.val = (val === undefined ? 0 : val);        
    this.left = (left === undefined ? null : left);        
    this.right = (right === undefined ? null : right) }
   }

first = new TreeNode(3); 
second = new TreeNode(4); 
third = new TreeNode(5); 
fourth = new TreeNode(1); 
fifth = new TreeNode(2);

sixth = new TreeNode(4); 
seventh = new TreeNode(1); 
eigth = new TreeNode(2);

first.left = second; 
first.right = third; 
second.left = fourth; 
second.right = fifth;

sixth.left = seventh; 
sixth.right = eigth;

postOrderTraversal(sixth); 
inOrderTraversal(sixth);

console.log(isSameTree(second,sixth))

console.log(isSubtree(first, sixth))

function isSubtree(root, subRoot){
  if(!root) {
    return false;
  }
  else if(isSameTree(root, subRoot)){
    return true;
  } 
  else{
    return isSubtree(root.left, subRoot) ||
           isSubtree(root.right, subRoot)
  }
}
function isSameTree(p , q){
  if(p === null && q === null) return true;
  if(p === null) return false;
  if(q === null) return false;
  return p.val === q.val &&
        isSameTree(p.left, q.left) &&
        isSameTree(p.right, q.right);
}

function inOrderTraversal(node) { 
  if (node === null) return; 
  inOrderTraversal(node.left); 
  console.log(node.val); 
  inOrderTraversal(node.right); }

function postOrderTraversal(node) { 
  if (node === null) return; 
  postOrderTraversal(node.right); 
  console.log(node.val); 
  postOrderTraversal(node.left); }