class Node{

  constructor(value){
    this.value = value
    this.next = null
    this.previous = null
  }

}

class Queue{

  constructor(){
    this.head = null
    this.tail = null
    this.length = 0
  }

  peek(){
    if(this.head)
      return this.head.value
  }

  add(value){
    let newNode = new Node(value)
    if(!this.head){
      this.head = newNode
    }else{
      this.tail.next = newNode
    }
    this.tail = newNode
    this.length++
  }

  isEmpty
}

let queue = new Queue()
