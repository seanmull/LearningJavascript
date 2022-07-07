/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
let KClosest = function(points, k) {
   return points.sort((a, b) => (a[0]**2 + a[1]**2) - (b[0]**2 + b[1]**2)).slice(0, k)
};

let arr = [[1,3],[-2,2]], k = 1
console.log(KClosest(arr, k))

a = 1
b = 2**2
c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
