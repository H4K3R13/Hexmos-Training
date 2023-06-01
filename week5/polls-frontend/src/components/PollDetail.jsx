import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import { Chart } from 'react-google-charts'

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

  const handleVote = async (pollId, option) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/polls/api/polls_vote/${pollId}/`, {
        incrementOption: option
      });
      console.log(response.data);
      alert(response.data["message"])
      fetchData()
      // Update the polls data or display a success message
    } catch (error) {
      console.log(error);
      // Handle the error response or display an error message
    }
  };

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

  return (
    <div style={{ display:'flex', flexDirection:"row", gap:"5rem"}}>
      <h1 style={{ textAlign:"center"}}>PollDetail: {id}</h1>
      {pollsData.map((poll, index) => (
        <div key={index} style={{ fontSize:"1.8rem", marginTop:"2rem"}}>
          <h2>{poll.Question}</h2>
          <ul>
            {Object.entries(poll.OptionVote).map(([option, votes]) => (
              <li key={option}>
                {option}: {votes}
                <button onClick={() => handleVote(id, option)} style={{ padding:".2rem .8rem", marginLeft:".2rem", background:"yellow", borderRadius:"10px"}}>Vote</button>
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
  )
}

export default PollDetail;
