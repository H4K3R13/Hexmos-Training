import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreatePoll() {
  const [poll, setPoll] = useState("");
  const [options, setOptions] = useState([{ option: "", vote: 0 }]);
  const [tags, setTags] = useState("");
  const navigate = useNavigate()

  
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options]; //Used spread operator here
    updatedOptions[index].option = value;
    setOptions(updatedOptions);
  };

  const handleAddOption = () => {
    const newOptions = [...options, { option: "", vote: 0 }];
    setOptions(newOptions);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      Question: poll,
      OptionVote: {},
      Tags: tags.split(",").map((t) => t.trim()),
    };

    options.forEach((option) => {
      data.OptionVote[option.option] = 0;
    });

    console.log(data);

    axios.post('http://127.0.0.1:8000/polls/api/question/', data)
      .then((response) => {
        console.log(response.data);
        alert(response.data["message"]);
        setPoll("");
        setOptions([{ option: "", vote: 0 }]);
        setTags("");
        handlePoll()
      })
      .catch((error) => {
        console.log("Error", error);
        alert(error.response.data["message"])
      });
  };

    const handlePoll = () =>{
      navigate("/")
    }

  return (
    <div>
      <h1 style={{textAlign:"center"}}>Create a Poll</h1>
      <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:".2rem"}}>
        <input type="text" placeholder="Enter the question" style={{padding:".5rem 1rem", fontSize:"1rem", borderRadius:"20px"}} value={poll} onChange={(e) => setPoll(e.target.value)} /><br />

        {options.map((option, index) => (
          <div key={index} style={{ display:"flex", flexDirection:"column", gap:".2rem"}} >
            <input type="text" style={{padding:".5rem 1rem", fontSize:"1rem", borderRadius:"20px", marginTop:".5rem"}} placeholder={`Option ${index + 1}`} value={option.option} onChange={(e) => handleOptionChange(index, e.target.value)} /><br/>
            <button type="button" style={{padding:".5rem 1rem", fontSize:"1rem", borderRadius:"20px", background:"linear-gradient(to right, #ff0000, #f1f6f1)"}} onClick={() => handleRemoveOption(index)}>Remove</button>
          </div>
        ))}

        <button type="button" style={{padding:".5rem 1rem", fontSize:"1rem", marginTop:".5rem", borderRadius:"20px", background:"linear-gradient(to right, #00ff2a, #f1f6f1)"}} onClick={handleAddOption}>Add Option</button><br/>
        <input type="text" style={{padding:".5rem 1rem", fontSize:"1rem", borderRadius:"20px"}} placeholder="Add tags" value={tags} onChange={(e) => setTags(e.target.value)} /><br />
        <button type="submit" style={{padding:".5rem 1rem", fontSize:"1rem", borderRadius:"20px", background:"linear-gradient(to right, #0099ff, #f1f6f1)"}}>Submit!</button>
      </form>
    </div>
  );
}

export default CreatePoll;
