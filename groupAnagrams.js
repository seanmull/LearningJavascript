/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    
    let createHash = (str) => {
        let h = new Array(26).fill(0)
        for(let c = 0; c < str.length; c++){
            h[str[c].charCodeAt() - 97]++
        }
        return h.join("#")
    }
    
    let m = new Map()
    let h;
    let n;
    for(let i = 0; i < strs.length; i++){
        h = createHash(strs[i])
        if(m.has(h)){
           n = m.get(h)
           n.push(strs[i])
           m.set(h, n)
        }else{
           m.set(h, [strs[i]])
        }
    }
    
    return [...m.values()]   
};
