const array = [1, 2, 3, 4];
array[2] = 8;
array;
// array = []

const map = new Map();
map.set("one", 1);
map;
console.log(map.get("one"));

for (const [k, v] of map) {
  console.log(`${k} ${v}`);
}

map.clear();
map;

map.set("w", "o");
map.set("o", "r");
map.set("r", "d");

map;

class Trie {
  constructor() {
    this.root = {};
  }

  insert(word) {
    let node = this.root;
    for (let c of word) {
      if (node[c] == null) node[c] = {};
      node = node[c];
    }
    console.log(this.root);
    node.isWord = true;
  }

  traverse(word) {
    let node = this.root;
    for (let c of word) {
      node = node[c];
      if (node == null) return null;
    }
    return node;
  }

  search(word) {
    const node = this.traverse(word);
    return node != null && node.isWord == true;
  }

  startsWith(prefix) {
    return this.traverse(prefix) != null;
  }
}

const trie = new Trie();
trie;
trie.insert("word");
console.log(trie.search("word"));
console.log(trie.search("wor"));
console.log(trie.startsWith("worde"));
trie;

let root = {};
let hash = root;
hash["c"] = {};
hash;
hash = hash["c"];
hash["d"] = {};
hash = hash["d"];
root;
