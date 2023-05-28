import React from 'react'
import Sidebar from './Sidebar'
import Heading from './Heading'
import MainContent from './MainContent'

function Home() {
  return (
    <div>
        <Heading/>
        <Sidebar/>
        <MainContent/>
    </div>
  )
}

export default Home