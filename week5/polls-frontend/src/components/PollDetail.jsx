import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'



function PollDetail() {
  let { id } = useParams()
  const [pollsData, setPollsData] = useState([]);

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
  
  return (
    <div>
        <h1>PollDetail: {id}</h1>
        {pollsData.map((poll,index) => (
            <div key={index}>
                <h1>{poll.Question}</h1>
                <ul>
                    {Object.entries(poll.OptionVote).map(([option, votes]) => (
                        <li key={option}>
                        {option}: {votes}
                        </li>
                    ))}
                </ul>
                <p>Tags: {poll.Tags.join(", ")}</p>
            </div>
        
        
        ))}
    </div>

  )
}

export default PollDetail