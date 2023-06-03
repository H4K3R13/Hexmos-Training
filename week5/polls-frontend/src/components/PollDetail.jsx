import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { Chart } from 'react-google-charts'


function PollDetail() {
  let { id } = useParams()
  const navigate = useNavigate()
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


  // Fix Chart
  const piedata = [["Options", "Votes"]];
  pollsData.forEach((poll) => {
    Object.entries(poll.OptionVote).forEach(([option, vote]) => {
      piedata.push([option, vote]);
    });
  });
  const options = {
    title: "Polls Votes",
  };

  console.log("piedata", piedata);

  const handleVoteClick = () => {
    navigate(`/vote/${id}`);
  };

  return (
    <div>

    <div style={{ display:'flex', flexDirection:"row", gap:"5rem"}}>
      <h1 style={{ textAlign:"center"}}>PollDetail: {id}</h1>
      {pollsData.map((poll, index) => (
        <div key={index} style={{ fontSize:"1.8rem", marginTop:"2rem"}}>
          <h2>{poll.Question}</h2>
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
      <div style={{ width:"35rem", height:"35rem"}}>
        <Chart
          chartType="PieChart"
          data={piedata}
          options={options}
          width={"100%"}
          height={"100%"}
        />
      </div>
    </div>
    <button style={{background:"grey", padding:"1rem 2rem", borderRadius:"10px", fontSize:"1rem"}} onClick={handleVoteClick}>Vote This Poll</button>
    </div>
  )
}

export default PollDetail;
