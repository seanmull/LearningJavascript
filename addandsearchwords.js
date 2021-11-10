class WordDictionary{
  constructor(){
    this.root = {};
  }

  addWord(word){
    let node = this.root;
    for(let c of word){
      if(node[c] == null) node[c] = {};
      node = node[c];
    }
    node.isWord = true;
  }

  search(word){
    const node = this.traverse(word);
    node
    return node != null && node.isWord == true;
  }

   traverse(word){
    let node = this.root;
    for(let c of word){
      node = node[c];
      node
      if(node == null) return null;
    }
    node
    return node;
  } 
}

let d = new WordDictionary();
d.addWord("dog");
d
console.log(d.search("do."));
