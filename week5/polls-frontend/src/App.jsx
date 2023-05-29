import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home"
import CreatePoll from "./components/CreatePoll";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/createpoll" element={<CreatePoll/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
