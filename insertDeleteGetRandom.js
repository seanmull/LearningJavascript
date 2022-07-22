
var RandomizedSet = function() {
  this.set = new Set()  
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
  let s = this.set.size    
  this.set.add(val)
  return s !== this.set.size
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
  let s = this.set.size  
  this.set.delete(val)
  return s !== this.set.size
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    let a = [...this.set]
    let index = Math.floor((Math.random() * a.length))
    return a[index]
};

/** 
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
var obj = new RandomizedSet()
var param_1 = obj.insert(1)
console.log(param_1)
var param_2 = obj.remove(2)
console.log(param_2)
var param_3 = obj.getRandom()
console.log(param_3)
 
