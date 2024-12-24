const BellmanAlgo = (nodes, edges, selectedSource) => {
  // Helper function to create an adjacency list from nodes and edges
  const createAdjacencyList = (nodes, edges) => {
    const graph = {};
    nodes.forEach((node) => {
      graph[node.id] = [];
    });
    edges.forEach((edge) => {
      graph[edge.source].push({ target: edge.target, weight: edge.data.weight });
    });
    return graph;
  };

  const graph = createAdjacencyList(nodes, edges);
  console.log("Adjacency List:", graph);

  const distance = {};
  const vertices = new Set();
  //for shortest paths
  const targetLastEdgeSource = {};
  const shortestPaths = {}; 

  // Initialize distances
  nodes.forEach((node) => {
    vertices.add(node.id);
    distance[node.id] = Infinity;
  });

  distance[selectedSource] = 0; // Start from the selected source node

  for (let i = 0; i < vertices.size - 1; i++) {
    edges.forEach((edge) => {
      const { source, target, data } = edge;
      if (
        distance[source] !== Infinity &&
        distance[source] + data.weight < distance[target]
      ) {
        distance[target] = distance[source] + data.weight;
        targetLastEdgeSource[target] = source; //to use it in finding the shortest paths
      }
    });
  }

  // Check for negative-weight cycles
  for (const edge of edges) {
    const { source, target, data } = edge;
    if (
      distance[source] !== Infinity &&
      distance[source] + data.weight < distance[target]
    ) {
      console.log("Graph contains negative cycle");
      alert("Graph contains negative cycle");
      return;
    }
  }

  //track the shortest paths for each target
  shortestPaths[selectedSource] = [selectedSource];
  Object.keys(targetLastEdgeSource).forEach((verticeId) => {
    shortestPaths[verticeId] = [verticeId];
    shortestPaths[verticeId] = [
      targetLastEdgeSource[verticeId],
      ...shortestPaths[verticeId],
    ];
    while (
      !shortestPaths[verticeId].find((nodeItem) => nodeItem === selectedSource)
    ) {
      let verticeIdPrec = shortestPaths[verticeId][0];
      shortestPaths[verticeId] = [
        targetLastEdgeSource[verticeIdPrec],
        ...shortestPaths[verticeId],
      ];
    }
  });

  return [distance, shortestPaths];
};
export default BellmanAlgo;