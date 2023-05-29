import './styles/PollsTable.css'
import axios from 'axios'
import { useState, useEffect } from 'react';

function PollsTable (props) {

  const [pollsData, setPollsData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/polls/api/polls/');
      setPollsData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <table>
            <thead>
                <tr>
                <th>Number</th>
                <th>Poll Question</th>
                <th>Total Votes</th>
                <th>Tags</th>
                </tr>
            </thead>
            <tbody>
                {pollsData.map((poll, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{poll.Question}</td>
                    <td>{Object.values(poll.OptionVote).reduce((a, b) => a + b)}</td>
                    <td>{poll.Tags.join(', ')}</td>
                </tr>
                ))}
            </tbody>
        </table>
        {props.name}
    </div>
  )
}
export default PollsTable;