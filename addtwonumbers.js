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

function addTwoNumbers(l1, l2) {
  l1;
  l2;
  let carryOver = 0;
  while (l1 && l2) {
    let num = l1.val + l2.val + carryOver;
    if (carryOver == 1) carryOver = 0;
    if (num > 9) {
      carryOver = 1;
      num -= 10;
    }
    console.log(num);
    l1 = l1.next;
    l2 = l2.next;
  }
}

console.log(addTwoNumbers(first, fourth));
