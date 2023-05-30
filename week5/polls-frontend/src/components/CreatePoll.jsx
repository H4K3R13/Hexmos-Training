import { useState } from "react"
import axios from 'axios'
function CreatePoll() {

  const [poll, setPoll] = useState("")
  const [option1, setOption1] = useState("")
  const [option2, setOption2] = useState("")
  const [vote1, setVote1] = useState(0)
  const [vote2, setVote2] = useState(0)
  const [tags, setTags] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    const data ={
        "Question" : poll,
        "OptionVote":{
          [option1]:vote1,
          [option2]:vote2,
        },
        "Tags":tags.split(",").map((t) => t.trim()),
      }
    console.log(data)
    axios.post('http://127.0.0.1:8000/polls/api/question/',data)
      .then((response) => {
        console.log(response.data)
        alert(response.data)
        setPoll("")
        setOption1("")
        setOption2("")
        setTags("")
        setVote1(0)
        setVote2(0)
      })
      .catch((error) => {
        console.log("Error",data)
      })
  }

  return (
    <div>
        <h1>Create a Poll</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter the question" onChange={(e) => setPoll(e.target.value)}/><br/>
            <input type="text" placeholder="Option1"  onChange={(e) => setOption1(e.target.value)}/>
            <input type="number" placeholder="votes" onChange={(e) => setVote1(parseInt(e.target.value))}/><br/>
            <input type="text" placeholder="Option2"  onChange={(e) => setOption2(e.target.value)}/>
            <input type="number" placeholder="votes" onChange={(e) => setVote2(parseInt(e.target.value))}/><br/>
            <input type="text" placeholder="Add tags" onChange={(e) => setTags(e.target.value)}/><br/>
            <button type="submit">Submit!</button>
        </form>
    </div>
  )
}

export default CreatePoll;