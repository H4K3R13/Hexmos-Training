import { useState } from "react"
function CreatePoll() {

  const [poll, setPoll] = useState("")
  const [option, setOption] = useState({})
  return (
    <div>
        <h1>Create a Poll</h1>
        <input type="text" placeholder="Enter the question" onChange={(e) => setPoll(e.target.value)}/><br/>
        <input type="text" placeholder="Option" name="Option 1" onChange={(e) => setOption(e.target.value)}/>
        <input type="text" placeholder="Option" onChange={(e) => setOption(option.append(e.target.value))}/><br/>
    </div>
  )
}

export default CreatePoll