class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

const first = new ListNode(2);
const second = new ListNode(4);
const third = new ListNode(3);
const fourth = new ListNode(5);
const fifth = new ListNode(6);
const sixth = new ListNode(4);

first.next = second;
second.next = third;
first;

fourth.next = fifth;
fifth.next = sixth;
fourth;

var addTwoNumbers = function(l1, l2) {
    let p1 = l1, p2 = l2
    let d = new ListNode(0)
    let co = 0
    let c = d
    let v1
    let v2
    let rm
    let n
    while(!(p1 === null && p2 === null) || co !== 0){
        v1 = p1 === null ? 0 : p1.val
        v2 = p2 === null ? 0 : p2.val
        sum = v1 + v2 + co
        co = (sum) > 9 ? 1 : 0
        rm = (sum) % 10
        n = co === 1 ?
                new ListNode(rm) :
                new ListNode(sum)
        c.next = n
        c = c.next
        if(p1 !== null) p1 = p1.next
        if(p2 !== null) p2 = p2.next
    }
    return d.next
};

console.log(addTwoNumbers(first, fourth));
