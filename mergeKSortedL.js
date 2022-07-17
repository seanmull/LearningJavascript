/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    let dummy = new ListNode(-Infinity)
    let mergedList = dummy
    for(let i = 0; i < lists.length; i++){
        if(lists[i] === null) continue
        mergedList = mergeTwoLists(mergedList, lists[i])
    }
    return mergedList.next
};

var mergeTwoLists = function(list1, list2) {
    let dummy = new ListNode()
    let mergedList = dummy
    let p1 = list1, p2 = list2

    while(p1 !== null || p2 !== null){ // null , 4
      if(p2 === null){
        mergedList.next = p1
        // move up merged and p1
        mergedList = mergedList.next 
        p1 = p1.next 
      }else if (p1 === null){
        mergedList.next = p2 
        // move up merged and p1
        mergedList = mergedList.next 
        p2 = p2.next 
      }else if(p2.val < p1.val){
        mergedList.next = p2 
        // move up merged and p1
        mergedList = mergedList.next 
        p2 = p2.next 
      }else{
        mergedList.next = p1 
        // move up merged and p1
        mergedList = mergedList.next 
        p1 = p1.next 
      }
        // disconnect next
        mergedList.next = null
    }
       return dummy.next
};
