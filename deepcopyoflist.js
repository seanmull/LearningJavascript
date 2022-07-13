// A linked list of length n is given such that each node 
// contains an additional random pointer, which could point to any node in the list, or null.
//
// Construct a deep copy of the list. The deep copy should 
// consist of exactly n brand new nodes, where each new node has 
// its value set to the value of its corresponding original node. 
// Both the next and random pointer of the new nodes should point 
// to new nodes in the copied list such that the pointers in the original 
// list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.
//
// For example, if there are two nodes X and Y in the original list, where X.random --> Y, then for the corresponding two nodes x and y in the copied list, x.random --> y.
//
// Return the head of the copied linked list.
//
// The linked list is represented in the input/output as a list of n nodes. Each node is represented as a pair of [val, random_index] where:
//
// val: an integer representing Node.val
// random_index: the index of the node (range from 0 to n-1) that the random pointer points to, or null if it does not point to any node.
// Your code will only be given the head of the original linked list.
/**
 * // Definition for a Node.
 * function Node(val, next, random) {

 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
function Node(val, next, random){
  this.val = val;
  this.next = next;
  this.random = random;
}
var copyRandomList = function(head) {
    let a = []
    let nextNode = head
    //build the nodes
    while(nextNode !== null){
      a.push(new Node(nextNode.val, null, nextNode.random))
      nextNode = nextNode.next
    }
    //create the connections
    for(let i = 0; i < a.length ; i++){
      if(i < a.length - 1){
        a[i].next = a[i + 1]
      }
      if(a[i].random !== null){
        a[i].random = a[a[i].random]
      }
    }
    return a[0]
};

//create list
// Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
// Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
let first = new Node(7, null, null)
let second = new Node(13, null, 0)
let third = new Node(11, null, 4)
let fourth = new Node(10, null, 2)
let fifth = new Node(1, null, 0)
first.next = second
second.next = third
third.next = fourth
fourth.next = fifth

console.log(copyRandomList(first))

