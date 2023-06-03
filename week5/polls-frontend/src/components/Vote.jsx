import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import {useNavigate} from "react-router-dom"

function Vote() {
  let { id } = useParams()
  const navigator = useNavigate()
  const [pollsData, setPollsData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData = async () => {
    try{
        const response  = await axios.get(`http://127.0.0.1:8000/polls/api/polls_vote/${id}/`)
        console.log(response.data)
        setPollsData(response.data)
    }
    catch(error){
        console.log(error)
    }
  }

  const handleVote = async (pollId) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/polls/api/polls_vote/${pollId}/`, {
        incrementOption: selectedOption,
      });
      console.log(response.data);
      alert(response.data["message"])
      fetchData()
      handleAfterVote(pollId)
      // Update the polls data or display a success message
    } catch (error) {
      console.log(error);
      // Handle the error response or display an error message
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleHome = () =>{
    navigator("/")
  }

  const handleAfterVote = () => {
    navigator(`/poll/${pollid}`)
  }

  return (
    <div>
    <div style={{ display:'flex', flexDirection:"row", gap:"5rem"}}>
      <h1 style={{ textAlign:"center"}}>Vote Your Poll: {id}</h1>
      {pollsData.map((poll, index) => (
        <div key={index} style={{ fontSize:"1.8rem", marginTop:"2rem"}}>
          <h2>{poll.Question}</h2>
          <ul>
            {Object.entries(poll.OptionVote).map(([option]) => (
              <li key={option}>
              <label>
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionChange(option)}
                />
                {option}
              </label>
            </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <button onClick={() => handleVote(id)} style={{ marginLeft:"20rem", padding:".5rem 1rem", fontSize:"1rem", borderRadius:"10px"}}>Vote</button><br/>
    <button onClick={handleHome} style={{ marginLeft:"1rem", padding:".5rem 1rem", fontSize:"1rem", borderRadius:"10px"}} >Back To Home</button>
    </div>
  )
}

export default Vote;
