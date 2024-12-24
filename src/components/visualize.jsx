import React, { useState } from "react";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import "./visualize.css";
import Header from "./Header";
import NodeControls from "./NodeControls";
import GraphContainer from "./GraphContainer";
import ShortestPathResults from "./ShortestPathResults";
import BellmanAlgo from "./BellmanFordAlgo/BellmanAlgo";

const BellmanFordGraph = () => {
  const [nodeName, setNodeName] = useState("");
  const [shortestDistances, setShortestDistances] = useState(null);
  const [selectedSource, setSelectedSource] = useState("");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [shortestPaths, setShortestPaths] = useState({}); //name to be changed

  //handling node and edge changes including positioning and deletion
  const onNodesChange = (changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  };

  const onEdgesChange = (changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  };

  //double click on edge to change the value of its weight
  const HandleDoubleClickEdge = (event, edge) => {
    event.preventDefault();
    const weight = prompt("Enter weight for this edge:", "1");
    const updatedEdge = {
      ...edge,
      data: { weight: parseInt(weight, 10) },
      label: `Weight: ${weight}`,
    };
    const updatedEdges = edges.map((edge) =>
      edge.id === updatedEdge.id ? updatedEdge : edge
    );
    setEdges(updatedEdges);
  };

  //onConnect for creating edges when connecting two nodes
  const onConnect = (params) => {
    const weight = prompt("Enter weight for this edge:", "1"); // Prompt user for edge weight
    const newEdge = {
      ...params,
      data: { weight: parseInt(weight, 10) },
      label: `Weight: ${weight}`,
      type: "straight", // Use 'straight' edge to avoid curved preview
      markerEnd: { type: MarkerType.ArrowClosed },
    };
    setEdges((eds) => addEdge(newEdge, eds));
  };

  const handleRunBellmanFord = () => {
    if (!selectedSource) {
      alert("Please select a source node.");
      return;
    }

    const [distances, shortestPaths] = BellmanAlgo(nodes, edges, selectedSource);

    setShortestPaths(shortestPaths);
    setShortestDistances(distances);
  };

  const addNewNode = () => {
    if (!nodeName.trim()) {
      alert("Please enter a valid node name.");
      return; // Prevent adding a node with an empty name
    }

    if (nodes.find((node) => node.data.label === nodeName)) {
      //checking if the node label is unique just for clarity reasons mainly in results table
      alert(`${nodeName} already exists`);
      return;
    }
    const newNodeId = nodeName;
    const newNode = {
      type: "customNode",
      id: newNodeId,
      position: { x: Math.random() * 200, y: Math.random() * 200 },
      data: { label: nodeName }, // Use the nodeName entered
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
      <Header />
      <NodeControls
        nodeName={nodeName}
        setNodeName={setNodeName}
        addNewNode={addNewNode}
        handleReset={handleReset}
        handleRunBellmanFord={handleRunBellmanFord}
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
        nodes={nodes}
      />

      <GraphContainer
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        HandleDoubleClickEdge={HandleDoubleClickEdge}
      />
      {shortestDistances && (
        <ShortestPathResults
          shortestDistances={shortestDistances}
          shortestPaths={shortestPaths}
        />
      )}
    </div>
  );
};

export default BellmanFordGraph;
