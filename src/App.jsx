import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import  Graph from "./components/Graph";
import ToolBar from "./components/Toolbar/Toolbar";
import AddEdgePopUp from "./components/AddEdgePopUp/AddEdgePopUp";
import './App.css';
import BellmanFordGraph from './components/visualize/visualize';

function App() {
  const [vertices,setVertices]=useState(new Set());
  const [edges,SetEdges]=useState();// here ghykoun array wla object
  let source=useState(null);//source

  return (
    <>
      <Graph/>
      <ToolBar/>
      <AddEdgePopUp/>
      <div className="App" style={{"position":"relative"}}>
      <BellmanFordGraph />
    </div>
    </>
  )
}

export default App
