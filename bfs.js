const graph = {
  a: ["b", "c"],
  b: ["d"],
  c: ["e"],
  d: ["f"],
  e: [],
  f: [],
};

graph;

function breadthFirstSearch(graph, source) {
  const queue = [source];
  while (queue.length > 0) {
    const current = queue.shift();
    for (let neighbors of graph[current]) {
      queue.push(neighbors);
    }
  }
}

console.log(breadthFirstSearch(graph, "a"));
