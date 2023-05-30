import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"

import Home from "./components/Home"
import CreatePoll from "./components/CreatePoll"
import PollDetail from "./components/PollDetail"

function App() {
  let { id } = useParams()
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/createpoll" element={<CreatePoll/>}/>
          <Route path="/poll/:id" element={<PollDetail/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
