import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"

import Home from "./components/Home"
import CreatePoll from "./components/CreatePoll"
import PollDetail from "./components/PollDetail"
import Heading from "./components/Heading"
import Vote from "./components/Vote"

function App() {
  let { id } = useParams()
  
  return (
    <div>
      <Heading/>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/createpoll" element={<CreatePoll/>}/>
          <Route path="/poll/:id" element={<PollDetail/>}/>
          <Route path="/vote/:id" element={<Vote/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
