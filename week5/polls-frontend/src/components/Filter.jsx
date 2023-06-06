import React, { useState, useEffect } from "react";
import axios from 'axios';

function Filter({ selectedTags, onSelectedTagsChange }) {
  const [tags, setTags] = useState([]);

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
      onSelectedTagsChange([...selectedTags, selectedTag]);
    } else {
      onSelectedTagsChange(selectedTags.filter((tag) => tag !== selectedTag));
    }
  };

  return (
    <div style={{ width: "20rem", background: "grey", padding: "1rem", borderRadius: "20px", marginRight: "10px" }}>
      {tags.map((tag) => (
        <div key={tag}>
          <input
            type="checkbox"
            id={tag}
            name={tag}
            value={tag}
            checked={selectedTags.includes(tag)}
            onChange={handleFilter}
          />
          <label>{tag}</label>
        </div>
      ))}
    </div>
  );
}

export default Filter;
