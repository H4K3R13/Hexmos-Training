import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/PollsTable.css'


function PollsTable(props) {

  const [pollsData, setPollsData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [props.selectedTags]);

  const fetchData = async () => {
    try {
      let url = 'http://127.0.0.1:8000/polls/api/polls/';
      if (props.selectedTags && props.selectedTags.length > 0) {
        const tagsQuery = `?tags=${props.selectedTags.join(',')}`;
        url = `http://127.0.0.1:8000/polls/api/polls_tags/${tagsQuery}`;
      }
      const response = await axios.get(url);
      setPollsData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {pollsData.length > 0 && (
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
                <td>
                  <Link to={`/poll/${poll.id}`}>{poll.Question}</Link>
                </td>
                <td>{Object.values(poll.OptionVote).reduce((a, b) => a + b)}</td>
                <td>{poll.Tags.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PollsTable;
