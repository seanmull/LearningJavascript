
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
  // move the element from the end to i
  // this makes it so if it is at the end it removes
  // if not the ith element is overitten with the end one
  let i = m.get(val)
  let l = a[a.length - 1]
  a[i] = l
  // update the map to the right index
  m.set(l, i)
  m.delete(val)
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
