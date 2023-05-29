import { useState, useEffect } from "react"
import axios from 'axios'
import  PollsTable  from "./PollsTable";

function Filter() {

  const [tags, setTags] = useState([])

  useEffect( () => {
    fetchData();
  },[]);

  const fetchData = async () => {
    try {
      const reponse = await axios.get('http://127.0.0.1:8000/polls/api/polls/tags/');
      setTags(reponse.data["Tags"]);
      console.log(reponse.data);
    }
    catch(error) {
      console.error(error)
    }
  }

  const handleFilter = () => {

  }
  return (
    <div>
      {tags.map((tag) => (
      <div key={tag}>
        <input type="checkbox" id={tag} name={tag} value={tag} onChange={handleFilter}/>
        <label>{tag}</label>
      </div>
      ))}
    </div>
  )
}

export default Filter