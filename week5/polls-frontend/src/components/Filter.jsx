import  { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { SelectedTagsContext } from "./Home";


function Filter() {
  const { selectedTags, setSelectedTags } = useContext(SelectedTagsContext);
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
      setSelectedTags([...selectedTags, selectedTag]);
    } else {
      setSelectedTags(selectedTags.filter((tag) => tag !== selectedTag));
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
