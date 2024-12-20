import React from "react";

const NodeControls = ({
  nodeName,
  setNodeName,
  addNewNode,
  handleReset,
  handleRunBellmanFord,
  selectedSource,
  setSelectedSource,
  nodes,
}) => (
  <div className="bg-gray-900 flex flex-wrap justify-center items-center gap-4 mb-10 p-6 rounded-2xl shadow-lg">
    <div className="relative">
      <input
        type="text"
        id="node-input"
        placeholder="Enter node name"
        value={nodeName}
        onChange={(e) => setNodeName(e.target.value)}
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
      onChange={(e) => setSelectedSource(e.target.value)}
      id="source-node"
      className="
        px-6 py-3 text-white bg-gray-800 border border-gray-700 rounded-full
        focus:ring-2 focus:ring-blue-500 focus:outline-none
        hover:bg-gray-700 transition duration-300 ease-in-out"
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
);

export default NodeControls;
