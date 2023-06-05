import React, { useState, useEffect, createContext } from "react";
import axios from 'axios';
import PollsTable from "./PollsTable";


export const SelectedTags = createContext();

function Filter() {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/polls/api/polls/tags/');
      setTags(response.data["Tags"]);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilter = (e) => {
    const selectedTag = e.target.value;
    if (e.target.checked) {
      setSelectedTags((prevTags) => [...prevTags, selectedTag]);
    } else {
      setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== selectedTag));
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "20rem", background: "grey", padding: "1rem", borderRadius: "20px", marginRight: "10px" }}>
        {tags.map((tag) => (
          <div key={tag}>
            <input type="checkbox" id={tag} name={tag} value={tag} onChange={handleFilter} />
            <label>{tag}</label>
          </div>
        ))}
      </div>
      <div>
      
        <SelectedTags.Provider value={selectedTags}>
          <PollsTable />
        </SelectedTags.Provider>
      </div>
    </div>
  );
}

export default Filter;
