function undirectedPath(edges, nodeA, nodeB) {
  const graph = buildGraph(edges);
  return hasPath(graph, nodeA, nodeB, new Set());
}

function hasPath(graph, src, dst, visited){
  if(src === dst) return true;
  if(visited.has(src)) return false;
  visited.add(src);

  for(let neighbor of graph[src]){
    if(hasPath(graph, neighbor, dst, visited)){
      return true;
    }
  }
  return false;
}

const edges = [
  ['i', 'j'],
  ['k', 'i'],
  ['m', 'k'],
  ['k', 'l'],
  ['o', 'n']
]

function buildGraph(edges){
  const graph = {};
  edges
  for (let edge of edges) {
    const [a, b] = edge;
    edge
    if (!(a in graph)) graph[a] = [];
    if (!(b in graph)) graph[b] = [];
    graph[a].push(b);
    graph[b].push(a);
  }

  return graph;
}

console.log(buildGraph(edges));
console.log(undirectedPath(edges, "i", 'k'));