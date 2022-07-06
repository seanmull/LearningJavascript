var numPairsDivisibleBy60 = function(nums) {
    let count = 0, map = new Map(); //{30 : 2, 20: 1, 40: 2}
    
    for(let num of nums){
        let mod = num % 60; // 30, 20, 30, 40, 40
        // the complement of 0 is 0 not 60 - mod
        let sHalf = mod === 0 ? 0 : 60 - mod; // 30, 40, 30, 20, 20 
        
        
        // if the complement is there add that number to the count
        // so if there are 2 complements we need to add both combinations
        if(map.has(sHalf)){
            count +=  map.get(sHalf) // 3
        }
        
        // update the current mods
        if(map.has(mod)){
            map.set(mod, map.get(mod) + 1) 
        } else {
            map.set(mod, 1) 
        }
    }
    
    return count;
};

console.log(numPairsDivisibleBy60([30,20,150,100,40]))

