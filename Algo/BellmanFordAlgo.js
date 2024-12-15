const Edge = require('./edge.js');
class Graph {
  constructor(totalVertices) {
    this.edges = []
    this.totalVertices = totalVertices;
  }
  addEdge(source, destination, weight) {
    this.edges.push(new Edge(source, destination, weight));
  }
  shortestDistance(source) {
    let containNegativeCycle = false;
    const distanceFromSource = new Array(this.totalVertices).fill(Number.MAX_SAFE_INTEGER)
    distanceFromSource[source] = 0;

    for (let i = 1; i <= this.totalVertices - 1; i++) {
      this.edges.forEach(edge => {
        const u = edge.source;
        const v = edge.destination;
        const w = edge.weight;
        if (distanceFromSource[u] !== Number.MAX_SAFE_INTEGER && distanceFromSource[u] + w < distanceFromSource[v])
          distanceFromSource[v] = distanceFromSource[u] + w;
      });
    }

    this.edges.forEach(edge => {
      const u = edge.source;
      const v = edge.destination;
      const w = edge.weight;
      if (distanceFromSource[u] !== Number.MAX_SAFE_INTEGER && distanceFromSource[u] + w < distanceFromSource[v]) {
        console.log('Graph contains a negative cycle');
        containNegativeCycle = true
      }
    });


    if (!containNegativeCycle) {
      distanceFromSource.forEach((distance, i) => {
        console.log(`${i}: ${distanceFromSource[i]}`)
      })
    }
  }
}
module.exports = Graph;