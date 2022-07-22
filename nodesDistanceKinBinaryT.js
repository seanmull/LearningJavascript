/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
function TreeNode(val) {
     this.val = val;
     this.left = this.right = null;
 }

var distanceK = function(root, target, K) {
    if(!root) return []; 
    const newRoot = mapParents(root, null, target); // maps the parent with each node and captures target as the center/new root.
    return findKDistApart(newRoot, K, []); // do bfs to find k dist nodes apart
};

const mapParents = (node, par, target) => {
    if(!node)
        return null;
    node.parent = par; // for each node map its parent.
    if(node == target)
        return target; //  return the target
    return mapParents(node.left, node, target) || mapParents(node.right, node, target); // go map both dir. when target found return that.
}

const findKDistApart = (node, K, res) => {
    if(!node || node.visited) // if none or already visited.
        return res; 
    if(K == 0){
        res.push(node.val); // dist reached. add in result array and send back
        return res;
    }
    node.visited = true; // mark as visited.
    findKDistApart(node.left, K-1, res); // go left 
    findKDistApart(node.right, K-1, res); // go right
    findKDistApart(node.parent, K-1, res); // go parent direction
    return res;
}

let one = new TreeNode(3)
let two = new TreeNode(5)
let three = new TreeNode(6)
let four = new TreeNode(2)
let five = new TreeNode(7)
let six = new TreeNode(4)
let seven = new TreeNode(1)
let eight = new TreeNode(0)
let nine = new TreeNode(8)

one.left = two
two.left = three
two.right = four
four.left = five
four.right = six
one.right = seven
seven.left = eight
seven.right = nine

console.log(one)
console.log(distanceK(one, 5, 2))





