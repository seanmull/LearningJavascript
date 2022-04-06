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
    queue;
    const current = queue.shift();
    console.log(current);
    console.log(graph[current]);
    for (let neighbors of graph[current]) {
      neighbors;
      queue.push(neighbors);
    }
  }
}

console.log(breadthFirstSearch(graph, "a"));
