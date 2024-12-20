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
  const shortestPathsString = {}; // confusing names to change later
  const shortest = {}; //same

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
        shortestPathsString[target] = source; //to use it in finding the shortest paths
      }
    });
  }
  //track the shortest paths for each target
  shortest[selectedSource] = [selectedSource];
  Object.keys(shortestPathsString).forEach((verticeId) => {
    shortest[verticeId] = [verticeId];
    shortest[verticeId] = [
      shortestPathsString[verticeId],
      ...shortest[verticeId],
    ];
    while (
      !shortest[verticeId].find((nodeItem) => nodeItem === selectedSource)
    ) {
      let verticeIdPrec = shortest[verticeId][0];
      shortest[verticeId] = [
        shortestPathsString[verticeIdPrec],
        ...shortest[verticeId],
      ];
    }
    // console.log(shortest[verticeId]);
  });

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
  // console.log("Shortest distances from source:", distance);

  //no need for this since we changed the id to be same as label
  // const distancesWithLabels = {};
  // nodes.forEach((node) => {
  //   distancesWithLabels[node.data.label] = distance[node.id];
  // });
  // setShortestPaths(distancesWithLabels);
  return [distance, shortest];
};
export default BellmanAlgo;