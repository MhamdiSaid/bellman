import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import  Graph from "./components/Graph";
import ToolBar from "./components/Toolbar/Toolbar";
import AddEdgePopUp from "./components/AddEdgePopUp/AddEdgePopUp";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Graph/>
      <ToolBar/>
      <AddEdgePopUp/>
    </>
  )
}

export default App
