const graph = {
  a: ["b", "c"],
  b: ["d"],
  c: ["e"],
  d: ["f"],
  e: [],
  f: [],
};

graph;

function depthFirstSearch(graph, source) {
  const stack = [source];
  while (stack.length > 0) {
    stack;
    const current = stack.pop();
    console.log(current);
    console.log(graph[current]);
    for (let neighbor of graph[current]) {
      neighbor;
      stack.push(neighbor);
    }
  }
}

graph;

function depthFirstSearchRecursion(graph, source) {
  console.log(source);
  console.log(graph[source]);
  for (let neighbor of graph[source]) {
    neighbor;
    depthFirstSearchRecursion(graph, neighbor);
  }
}

console.log(depthFirstSearch(graph, "a"));
console.log(depthFirstSearchRecursion(graph, "a"));
