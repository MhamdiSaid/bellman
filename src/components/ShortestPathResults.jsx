import React from "react";

const ShortestPathResults = ({ shortestDistances, shortestPaths }) => (
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
            <th className="px-6 py-3 text-lg font-semibold text-left border-b border-gray-700">
              Shortest Path
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(shortestDistances).map(([node, distance], index) => (
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
              <td className="px-6 py-4 text-lg">
                {distance === Infinity ? (
                  <span className="text-red-500 font-semibold">_</span>
                ) : (
                  <span className="text-green-400 font-semibold">
                    {shortestPaths[node].join(", ")}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ShortestPathResults;
