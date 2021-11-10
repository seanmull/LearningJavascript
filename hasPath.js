const graph = 
{
  "f": ['g','i'],
  'g': ['h'],
  'h': [],
  'i': ['g','k'],
  'j': ['i'],
  'k': []
}

graph

function hasPath(graph, src, dst){
  src
  dst
  if(src === dst) return true;
  console.log(graph[src])
  for(const neighbor of graph[src]){
    neighbor
    if(hasPath(graph, neighbor, dst)) return true;
  }
  return false;
}
graph
function hasPathBfs(graph, src, dst){
    src
    dst
    const queue = [src];
    while(queue.length > 0){
      queue
      const current = queue.shift();
      current
      if(current === dst) return true;
      console.log(graph[src])
      for(const neighbor of graph[current]){
        neighbor
        queue.push(neighbor);
      }
    }
    return false;
}


console.log(hasPath(graph, "f", "i"));
console.log(hasPathBfs(graph, 'f', 'k'));