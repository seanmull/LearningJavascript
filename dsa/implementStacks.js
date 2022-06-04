class Node {
    constructor(value){
      this.value = value
      this.next = null
      this.previous = null
    }
}

class Stack {

  constructor(){
    this.length = 0
    this.head = null
  }

  peek(){
    if(this.head)
      return this.head.value 
  }

  push(value){
    let newNode = new Node(value)
    if(this.isEmpty()){
      this.head = newNode
    }else{
      this.head.next = newNode
      newNode.previous = this.head
      this.head = newNode
    }
    this.length++;
  }

  pop(){
    if(!this.isEmpty()){
      let returnValue = this.peek()
      this.head.previous.next = null
      this.head = this.head.previous
      this.length--;
      return returnValue
    }
  }

  isEmpty(){
    return (!this.head || this.length === 0)
  }

}

let s = new Stack()
s.push(2)
s.push(4)
s.push(6)
s.length
s.peek()
s.pop()
s.peek()
s.length
s.isEmpty()
s.pop()
s.isEmpty()
s.length
console.log(s.peek())

