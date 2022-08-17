class TreeNode {
  constructor(val, left, right) {
    this.val = val;
    this.left = left;
    this.right = right;
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

//       6
//    2     8
// 0    4 7   9
//    3   5
// inOrderTraversal(first);

/*
  Base case
  Case 1 root = null return null
  Case 2 root = p or q return root.val
  Recursive case
  left = lca(root.left)
  right = lca(root.right)
  if(left != null and right == null) return left 
  if(right != null and left == null) return right
  return null
*/

console.log(lowestCommonAncestor(first, 7, 9));

function lowestCommonAncestor(root, p, q) {}
