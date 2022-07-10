/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
class ListNode{
  constructor(val, next) {
       this.val = (val===undefined ? 0 : val)
       this.next = (next===undefined ? null : next)
  }
}
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    let dummy = new ListNode()
    let mergedList = dummy
    let p1 = list1, p2 = list2

    while(p1 !== null && p2 !== null){
      if(p2 === null || p2.val >= p1.val){
        mergedList.next = p1
        // move up merged and p1
        mergedList = mergedList.next
        p1 = p1.next
      }else{
        mergedList.next = p2
        // move up merged and p1
        mergedList = mergedList.next
        p2 = p2.next
      }
        // disconnect next
        mergedList.next = null
    }
       return dummy.next
};

let n1 = new ListNode(1)
let n2 = new ListNode(2)
let n3 = new ListNode(4)
n1.next = n2
n2.next = n3
// console.log(n1)

let n4 = new ListNode(1)
let n5 = new ListNode(3)
let n6 = new ListNode(4)
n4.next = n5
n5.next = n6
// n4 

console.log(mergeTwoLists(n1, n4))

// let list1 = [1,2,4], list2 = [1,3,4]
// Output: [1,1,2,3,4,4]
