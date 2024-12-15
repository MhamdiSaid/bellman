import React, { useState } from 'react';
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
  MiniMap,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

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
  const [nodes, setNodes] = useState([
    { id: '1', position: { x: 100, y: 100 }, data: { label: 'Node 1' }, style: { width:'50px', height:'50px', borderRadius: '50%' } },
  ]);
  const [edges, setEdges] = useState([]);

  const onNodesChange = (changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  };

  const onEdgesChange = (changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  };

  const onConnect = (params) => {
    const weight = prompt('Enter weight for this edge:', '1'); // Prompt user for edge weight
    const newEdge = {
      ...params,
      data: { weight: parseInt(weight, 10) },
      label: `Weight: ${weight}`,
      type: 'straight', // Use 'straight' edge to avoid curved preview
      // style: { strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed}
      // markerEnd: 'url(#arrowhead)', // Optional: Adjust edge thickness
    };
    setEdges((eds) => addEdge(newEdge, eds));
  };
  const handleRunBellmanFord = () => {
    const graph = createAdjacencyList(nodes, edges);
    console.log('Adjacency List:', graph);
  
    // Initialize distance object to track shortest distances from the source node
    const distance = {};
    const vertices = new Set();
  
    // Add all nodes to the vertices set and initialize distances
    nodes.forEach((node) => {
      vertices.add(node.id); // Collect all unique node IDs
      distance[node.id] = Infinity; // Initialize all nodes' distances to Infinity
    });
  
    // Assume the first node is the source node
    const startNode = nodes[0]?.id;
    if (startNode) {
      distance[startNode] = 0; // Set distance of the start node to 0
  
      // Bellman-Ford algorithm: Relax edges up to V - 1 times
      for (let i = 0; i < vertices.size - 1; i++) {
        edges.forEach((edge) => {
          const { source, target, data } = edge;
          // Relax edges: if the current distance is smaller, update it
          if (distance[source] !== Infinity && distance[source] + data.weight < distance[target]) {
            distance[target] = distance[source] + data.weight;
          }
        });
      }
  
      // Check for negative-weight cycles
      for (const edge of edges) {
        const { source, target, data } = edge;
        if (distance[source] !== Infinity && distance[source] + data.weight < distance[target]) {
          console.log("Graph contains negative cycle");
          alert("Graph contains negative cycle");
          return;
        }
      }
  
      // Display the results
      console.log('Shortest distances from start node:', distance);
      alert(`Shortest distances: ${JSON.stringify(distance)}`);
    }
  };
  
  // const handleRunBellmanFord = () => {
  //   const graph = createAdjacencyList(nodes, edges);
  //   console.log('Adjacency List:', graph);
  //   const distance = {};
  //   nodes.forEach((node) => {
  //     distance[node.id] = Infinity;
  //   });

  //   const startNode = nodes[0]?.id;
  //   if (startNode) {
  //     distance[startNode] = 0;
  //     for (let i = 0; i < nodes.size - 1; i++) {
  //       edges.forEach((edge) =>  {
  //         const { source, destination, data } = edge;
  //         if (distance[source] !== Infinity && distance[source] + data.weight < distance[destination]) {
  //           distance[destination] = distance[source] + data.weight;
  //         }
  //       })
  //     }
    
  //     for (const edge of edges) {
  //       const { source, destination, data } = edge;
  //       if (distance[source] !== Infinity && distance[source] + data.weight < distance[destination]) {
  //         console.log("Graph contains negative cycle");
  //         return;
  //       }
  //     }

  //     // for (let i = 0; i < nodes.length - 1; i++) {
  //     //   edges.forEach((edge) => {
  //     //     const { source, target, data } = edge;
  //     //     if (distances[source] + data.weight < distances[target]) {
  //     //       distances[target] = distances[source] + data.weight;
  //     //     }
  //     //   });
  //     // }

  //     console.log('Shortest distances from start node:', distance);
  //     alert(`Shortest distances: ${JSON.stringify(distance)}`);
  //   }
  // };

  const addNewNode = () => {
    const newNodeId = (nodes.length + 1).toString();
    const newNode = {
      id: newNodeId,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `Node ${newNodeId}` },
      style: {width: '50px',
        height: '50px',
         borderRadius: '50%' 
      }, // Circular nodes
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        defaultEdgeOptions={{
          type: 'straight', // Set default edge type to 'straight'
          // style: { strokeWidth: 2 },
          // animated: true, // Optional: Add animation for edge creation
          arrowHeadType: 'arrowclosed'
        }}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>

      <button
        onClick={addNewNode}
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 10,
          padding: '10px',
          background: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          marginRight: '10px',
        }}
      >
        Add Node
      </button>

      <button
        onClick={handleRunBellmanFord}
        style={{
          position: 'absolute',
          top: 10,
          left: 130,
          zIndex: 10,
          padding: '10px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Run Bellman-Ford
      </button>
    </div>
  );
};

export default BellmanFordGraph;



//////////////////////////////////////WITH POPUP////////////////////////////////////////////////////
// import React, { useState } from 'react';
// import ReactFlow, {
//   addEdge,
//   applyNodeChanges,
//   applyEdgeChanges,
//   Background,
//   Controls,
//   MiniMap,
//   MarkerType,
// } from 'reactflow';
// import 'reactflow/dist/style.css';

// // Helper function to create an adjacency list from nodes and edges
// const createAdjacencyList = (nodes, edges) => {
//   const graph = {};
//   nodes.forEach((node) => {
//     graph[node.id] = [];
//   });
//   edges.forEach((edge) => {
//     graph[edge.source].push({ target: edge.target, weight: edge.data.weight });
//   });
//   return graph;
// };

// const BellmanFordGraph = () => {
//   const [nodes, setNodes] = useState([
//     { id: '1', position: { x: 100, y: 100 }, data: { label: 'Node 1' }, style: { width: '50px', height: '50px', borderRadius: '50%' } },
//   ]);
//   const [edges, setEdges] = useState([]);
  
//   // States for popup form
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [sourceNode, setSourceNode] = useState(null);
//   const [destinationNode, setDestinationNode] = useState('');
//   const [weight, setWeight] = useState('');

//   const onNodesChange = (changes) => {
//     setNodes((nds) => applyNodeChanges(changes, nds));
//   };

//   const onEdgesChange = (changes) => {
//     setEdges((eds) => applyEdgeChanges(changes, eds));
//   };

//   const onConnect = (params) => {
//     // Prevent automatic edge creation by ReactFlow, since we are using a custom popup
//     // This function isn't used anymore in this updated code
//   };

//   // Function to open the popup on right-click
//   const handleRightClick = (event, nodeId) => {
//     event.preventDefault();
//     setSourceNode(nodeId);
//     setIsPopupOpen(true);
//   };

//   const handleAddEdge = (e) => {
//     e.preventDefault(); // Prevent page reload

//     if (sourceNode && destinationNode && weight) {
//       const newEdge = {
//         source: sourceNode,
//         target: destinationNode,
//         data: { weight: parseInt(weight, 10) },
//         label: `Weight: ${weight}`,
//         type: 'straight',
//         markerEnd: { type: MarkerType.ArrowClosed },
//       };
//       setEdges((eds) => addEdge(newEdge, eds));
//       setIsPopupOpen(false); // Close the popup after edge is added
//       setWeight(''); // Reset weight field
//       setDestinationNode(''); // Reset destination field
//     }
//   };

//   const handleRunBellmanFord = () => {
//     const graph = createAdjacencyList(nodes, edges);
//     console.log('Adjacency List:', graph);

//     const distance = {};
//     const vertices = new Set();

//     nodes.forEach((node) => {
//       vertices.add(node.id);
//       distance[node.id] = Infinity;
//     });

//     const startNode = nodes[0]?.id;
//     if (startNode) {
//       distance[startNode] = 0;

//       for (let i = 0; i < vertices.size - 1; i++) {
//         edges.forEach((edge) => {
//           const { source, target, data } = edge;
//           if (distance[source] !== Infinity && distance[source] + data.weight < distance[target]) {
//             distance[target] = distance[source] + data.weight;
//           }
//         });
//       }

//       for (const edge of edges) {
//         const { source, target, data } = edge;
//         if (distance[source] !== Infinity && distance[source] + data.weight < distance[target]) {
//           console.log("Graph contains negative cycle");
//           alert("Graph contains negative cycle");
//           return;
//         }
//       }

//       console.log('Shortest distances from start node:', distance);
//       alert(`Shortest distances: ${JSON.stringify(distance)}`);
//     }
//   };

//   const addNewNode = () => {
//     const newNodeId = (nodes.length + 1).toString();
//     const newNode = {
//       id: newNodeId,
//       position: { x: Math.random() * 400, y: Math.random() * 400 },
//       data: { label: `Node ${newNodeId}` },
//       style: { width: '50px', height: '50px', borderRadius: '50%' },
//     };
//     setNodes((nds) => [...nds, newNode]);
//   };

//   return (
//     <div style={{ width: '100%', height: '100vh' }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         fitView
//         defaultEdgeOptions={{
//           type: 'straight',
//           arrowHeadType: 'arrowclosed',
//         }}
//         onNodeContextMenu={(event, node) => handleRightClick(event, node.id)} // Right-click to trigger popup
//       >
//         <MiniMap />
//         <Controls />
//         <Background />
//       </ReactFlow>

//       <button
//         onClick={addNewNode}
//         style={{
//           position: 'absolute',
//           top: 10,
//           left: 10,
//           zIndex: 10,
//           padding: '10px',
//           background: '#28a745',
//           color: 'white',
//           border: 'none',
//           borderRadius: '5px',
//           marginRight: '10px',
//         }}
//       >
//         Add Node
//       </button>

//       <button
//         onClick={handleRunBellmanFord}
//         style={{
//           position: 'absolute',
//           top: 10,
//           left: 130,
//           zIndex: 10,
//           padding: '10px',
//           background: '#007bff',
//           color: 'white',
//           border: 'none',
//           borderRadius: '5px',
//         }}
//       >
//         Run Bellman-Ford
//       </button>

//       {/* Popup for adding edge */}
//       {isPopupOpen && (
//         <div
//           style={{
//             position: 'absolute',
//             top: '30%',
//             left: '30%',
//             padding: '20px',
//             background: '#fff',
//             borderRadius: '8px',
//             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//             zIndex: 100,
//           }}
//         >
//           <h3>Add Edge</h3>
//           <div>
//             <label>
//               Source Node: {sourceNode}
//             </label>
//           </div>
//           <div>
//             <label>
//               Destination Node:
//               <select
//                 value={destinationNode}
//                 onChange={(e) => setDestinationNode(e.target.value)}
//               >
//                 <option value="">Select a destination node</option>
//                 {nodes.map((node) => (
//                   <option key={node.id} value={node.id}>
//                     {node.data.label}
//                   </option>
//                 ))}
//               </select>
//             </label>
//           </div>
//           <div>
//             <label>
//               Weight:
//               <input
//                 type="number"
//                 value={weight}
//                 onChange={(e) => setWeight(e.target.value)}
//               />
//             </label>
//           </div>
//           <div>
//             <button onClick={handleAddEdge}>Submit</button>
//             <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BellmanFordGraph;
