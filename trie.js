class TrieNode{
    constructor(){
        this.children = new Map();
        this.endOfWord = false;
    }
}
class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word){
        let cur = this.root;

        for(let c of word){
            console.log(!cur.children.has(c))
            if(!cur.children.has(c)){
                cur.children[c] = new TrieNode();
                console.log(cur.children)
            }
            cur = cur.children[c];
        }
        console.log(cur.children)
        cur.endOfWord = true;
    }


    
}


const trie = new Trie();
trie.insert("word");
trie