class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

class Tree {
  constructor(value) {
    this.root = new Node(value)
  }

  insert(value) {
    let addedNode = new Node(value)
    if (!this.root) {
      this.root = addedNode
      return this
    }
    let currentNode = this.root
    while (true) {
      if (currentNode.value > value) {
        if (currentNode.left) {
          currentNode = currentNode.left
        } else {
          currentNode.left = addedNode
          return this
        }
      } else if (currentNode.value < value) {
        if (currentNode.right) {
          currentNode = currentNode.right
        } else {
          currentNode.right = addedNode
          return this
        }
      } else {
        return undefined
      }
    }
  }
  find(value) {
    let current = this.root
    while (current !== null) {
      if (current.value === value) return true
      else if (current.value > value) current = current.left
      else if (current.value < value) current = current.right
    }
    return false
  }

  BST() {
    let current = this.root
    let q = [current]
    let result = []
    while (q.length !== 0) {
      current = q.shift()
      result.push(current.value)
      if (current.left !== null) q.push(current.left)
      if (current.right !== null) q.push(current.right)
    }
    return result
  }

  InOrderTrav() {
    return this.InOrderTravHelper(this.root, [])
  }

  InOrderTravHelper(root, results) {
    if (root !== null) {
      this.InOrderTravHelper(root.left)
      console.log(root.value)
      this.InOrderTravHelper(root.right)
    }
    return results
  }
}

//     2
//   1   3
// 4

// q [1,3]
// r [2]

let tree = new Tree(2)
tree.insert(3)
tree.insert(1)
tree.insert(4)
tree.root.right.right.value
console.log(tree)

tree.BST()
tree.InOrderTrav()
// tree.find(3)
// tree.find(2)
// tree.find(1)
// tree.find(9)
