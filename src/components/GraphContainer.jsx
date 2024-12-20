import React from "react";
import ReactFlow, { MiniMap, Controls, Background, Handle } from "reactflow";
//create custom nodes with circular shapes and with horizontal handles
const circularNodeStyles = {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  border: "1px solid #777",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#fff",
};
const CustomNode = ({ data }) => (
  <div style={circularNodeStyles}>
    {" "}
    <Handle
      type="target"
      position="left"
      id="a"
      style={{ background: "#555" }}
    />{" "}
    <div>{data.label}</div>{" "}
    <Handle
      type="source"
      position="right"
      id="b"
      style={{ background: "#555" }}
    />{" "}
  </div>
);
const nodeTypes = { customNode: CustomNode };

const GraphContainer = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  HandleDoubleClickEdge,
}) => (
  <div
    id="graph-container"
    className="relative w-full max-w-7xl h-[700px] glass rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
  >
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      defaultEdgeOptions={{
        type: "straight",
        arrowHeadType: "arrowclosed",
      }}
      onEdgeDoubleClick={HandleDoubleClickEdge}
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  </div>
);

export default GraphContainer;
