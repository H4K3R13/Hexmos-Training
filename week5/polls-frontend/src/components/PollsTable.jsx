import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/PollsTable.css'
import { SelectedTagsContext } from "./Home";



function PollsTable() {
  const { selectedTags } = useContext(SelectedTagsContext);

  const [pollsData, setPollsData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [selectedTags]);

  const fetchData = async () => {
    try {
      let url = 'http://127.0.0.1:8000/polls/api/polls/';
      if (selectedTags && selectedTags.length > 0) {
        const tagsQuery = `?tags=${selectedTags.join(',')}`;
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
