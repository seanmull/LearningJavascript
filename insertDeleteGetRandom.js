
var RandomizedSet = function() {
  this.a = []
  this.m = new Map()
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
  m = this.m
  a = this.a
  if(m.has(val)) return false
  m.set(val, a.length)
  a.push(val)
  return true
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
  m = this.m
  a = this.a
  if(!m.has(val)) return false
  let i = m[val]
  delete m[val]
  if(a[a.length - 1] !== val){
    let tmp = a[i]
    a[i] = a[a.length - 1]
    a[a.length - 1] = tmp
  }
  a.pop()
  return true
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
  a = this.a
  return a[Math.floor(Math.random() * a.length)]
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
 
