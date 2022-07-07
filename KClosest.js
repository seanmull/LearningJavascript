/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
let KClosest = function(points, k) {
   return points.map((point) => {
    return {
      "point": point,
      "distance": Math.sqrt(Math.pow(point[0], 2) + Math.pow(point[1], 2))
    }
  }).sort((a, b) => a.distance - b.distance )
  .map(obj => obj.point).slice(0, -1*k)
};

let arr = [[1,3],[-2,2]], k = 1
console.log(KClosest(arr, k))

a = 1
b = 2
c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
