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

    <div style={{ display:'flex', flexDirection:"row"}}>
      {/*<h1 style={{ textAlign:"center"}}>PollDetail: {id}</h1>*/}
      {pollsData.map((poll, index) => (
        <div key={index} style={{ fontSize:"1.8rem", marginTop:"2rem"}}>
          <h2>{poll.Question}</h2>
          <button style={{background:"grey", marginBottom:"1rem", padding:"1rem 2rem", borderRadius:"10px", fontSize:"1rem"}} onClick={handleVoteClick}>Vote This Poll</button>
        <table style={{ width: "30rem", marginTop: "1rem", height:"10rem" }}>
          <thead>
            <tr>
              <th>Number</th>
              <th>Option</th>
              <th>Votes</th>
            </tr>
          </thead>
        
          <tbody>
            {Object.entries(poll.OptionVote).map(([option, votes],index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{option}</td> 
                <td>{votes}</td>
              </tr>
            ))}
          </tbody>
          </table>
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
    </div>
  )
}

export default PollDetail;
