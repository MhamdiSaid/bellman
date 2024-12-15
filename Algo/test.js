const Graph = require('./BellmanFordAlgo.js');
/**
 * Test-Case N1:
 */
const edges1 = [
  { source: 0, destination: 1, weight: 4 },
  { source: 0, destination: 2, weight: 1 },
  { source: 2, destination: 1, weight: 2 },
  { source: 1, destination: 3, weight: 1 },
  { source: 2, destination: 3, weight: 5 },
];
const vertices1 = 4; // 4 vertices: 0, 1, 2, 3
// Expected Output:
// Shortest distance from 0:
// - To 0: 0
// - To 1: 3
// - To 2: 1
// - To 3: 4

/**
 * Test-Case N2:
 */
const edges2 = [
  { source: 0, destination: 1, weight: 1 },
  { source: 1, destination: 2, weight: -1 },
  { source: 2, destination: 3, weight: -1 },
  { source: 3, destination: 0, weight: 1 },
  { source: 0, destination: 2, weight: 2 },
];
const vertices2 = 4; // 4 vertices: 0, 1, 2, 3

// Expected Output:
// Shortest distance from 0:
// - To 0: 0
// - To 1: 1
// - To 2: 0
// - To 3: -1

/**
 * Test-Case N3:
 */
const edges3 = [
  { source: 0, destination: 1, weight: 1 },
  { source: 1, destination: 2, weight: -1 },
  { source: 2, destination: 3, weight: -1 },
  { source: 3, destination: 1, weight: -1 }, // Negative cycle: 1 → 2 → 3 → 1
];
const vertices3 = 4; // 4 vertices: 0, 1, 2, 3

// Expected Output:
// Algorithm should detect a negative weight cycle.

/**
 * Test-Case N4:
 */
const edges4 = [
  { source: 0, destination: 1, weight: 2 },
  { source: 1, destination: 2, weight: 3 },
];
const vertices4 = 5; // 5 vertices: 0, 1, 2, 3, 4 (3 and 4 are disconnected)

// Expected Output:
// Shortest distance from 0:
// - To 0: 0
// - To 1: 2
// - To 2: 5
// - To 3: Infinity (unreachable)
// - To 4: Infinity (unreachable)

/**
 * Test-Case N5:
 */
const edges5 = [];
const vertices5 = 1; // 1 vertex: 0

// Expected Output:
// Shortest distance from 0:
// - To 0: 0

const graph = new Graph(vertices4);
edges4.forEach(edge => graph.addEdge(edge.source, edge.destination, edge.weight));
graph.shortestDistance(0)