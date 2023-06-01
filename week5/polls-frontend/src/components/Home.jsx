import React from 'react'
import Sidebar from './Sidebar'
// import MainContent from './MainContent' Removed the main content becaues the PollsTable .jsx is rendered twice

function Home() {
  return (
    <div style={{ display:"flex", flexDirection:"row"}}>
        <Sidebar/>
    </div>
  )
}

export default Home