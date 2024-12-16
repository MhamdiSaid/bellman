import React, { useState } from "react";
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
  MiniMap,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import "./visualize.css";

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

const BellmanFordGraph = () => {
  const [nodeName, setNodeName] = useState("");
  const [shortestPaths, setShortestPaths] = useState(null);
  const [selectedSource, setSelectedSource] = useState("");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onNodesChange = (changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  };

  const onEdgesChange = (changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  };

  const onConnect = (params) => {
    const weight = prompt("Enter weight for this edge:", "1"); // Prompt user for edge weight
    const newEdge = {
      ...params,
      data: { weight: parseInt(weight, 10) },
      label: `Weight: ${weight}`,
      type: "straight", // Use 'straight' edge to avoid curved preview
      // style: { strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed },
      // markerEnd: 'url(#arrowhead)', // Optional: Adjust edge thickness
    };
    setEdges((eds) => addEdge(newEdge, eds));
  };
  const handleRunBellmanFord = () => {
    if (!selectedSource) {
      alert("Please select a source node.");
      return;
    }

    const graph = createAdjacencyList(nodes, edges);
    console.log("Adjacency List:", graph);

    const distance = {};
    const vertices = new Set();

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

    console.log("Shortest distances from source:", distance);
    const distancesWithLabels = {};
    nodes.forEach((node) => {
      distancesWithLabels[node.data.label] = distance[node.id];
    });
    setShortestPaths(distancesWithLabels);
  };

  const addNewNode = () => {
    if (!nodeName.trim()) {
      alert("Please enter a valid node name.");
      return; // Prevent adding a node with an empty name
    }

    const newNodeId = (nodes.length + 1).toString();
    const newNode = {
      id: newNodeId,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: nodeName }, // Use the nodeName entered
      style: { width: "50px", height: "50px", borderRadius: "50%" }, // Circular nodes
    };

    setNodes((nds) => [...nds, newNode]);
    setNodeName(""); // Reset input field
  };

  const handleReset = () => {
    setNodes([]);
    setEdges([]);
  };

  return (
    <div className="body min-h-screen flex flex-col items-center px-6 py-10">
      <header className="text-center mb-10">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Graphe-Bellman
        </h1>
        <p className="text-gray-400 text-lg mt-2">
          Visualize graphs and find shortest paths effortlessly
        </p>
      </header>

      <div className="bg-gray-900 flex flex-wrap justify-center items-center gap-4 mb-10 p-6 rounded-2xl shadow-lg">
        <div className="relative">
          <input
            type="text"
            id="node-input"
            placeholder="Enter node name"
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)} // Updates state
            className="w-56 px-4 py-2 text-black rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={addNewNode}
          id="add-node"
          className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transform transition duration-300"
        >
          Add Node
        </button>

        <button
          onClick={handleReset}
          id="reset"
          className="px-6 py-3 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transform transition duration-300"
        >
          Reset
        </button>

        <button
          onClick={handleRunBellmanFord}
          id="run-bellman"
          className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transform transition duration-300"
        >
          Run Bellman-Ford
        </button>

        <select
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)} // Update state on change
          id="source-node"
          className="
    px-6 py-3
    text-white
    bg-gray-800 border border-gray-700 rounded-full
    focus:ring-2 focus:ring-blue-500 focus:outline-none
    hover:bg-gray-700
    transition duration-300 ease-in-out
  "
        >
          <option value="" className="text-black">
            Select Source
          </option>
          {nodes.map((node) => (
            <option key={node.id} value={node.id} className="text-black">
              {node.data.label}
            </option>
          ))}
        </select>
      </div>

      <div
        id="graph-container"
        className="relative w-full max-w-7xl h-[700px] glass rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          defaultEdgeOptions={{
            type: "straight", // Set default edge type to 'straight'
            // style: { strokeWidth: 2 },
            // animated: true, // Optional: Add animation for edge creation
            arrowHeadType: "arrowclosed",
          }}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      {shortestPaths && (
        <div className="mt-10 w-full max-w-2xl mx-auto p-4 bg-gray-900 rounded-2xl shadow-2xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6 text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Shortest Path Results
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                  <th className="px-6 py-3 text-lg font-semibold text-left border-b border-gray-700">
                    Node
                  </th>
                  <th className="px-6 py-3 text-lg font-semibold text-left border-b border-gray-700">
                    Distance
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(shortestPaths).map(
                  ([node, distance], index) => (
                    <tr
                      key={node}
                      className={`${
                        index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                      } hover:bg-gray-600 transition-colors duration-200`}
                    >
                      <td className="px-6 py-4 text-lg font-medium">{node}</td>
                      <td className="px-6 py-4 text-lg">
                        {distance === Infinity ? (
                          <span className="text-red-500 font-semibold">∞</span>
                        ) : (
                          <span className="text-green-400 font-semibold">
                            {distance}
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BellmanFordGraph;
