import {useNavigate} from "react-router-dom"

function CreatePollBtn() {
    const navigator = useNavigate()

    return (
        <button onClick={ () => navigator("/createpoll")} style={{padding:"1rem 2rem", background:"pink", margin:".5rem", borderRadius:"10px", fontSize:"1rem"}}>
            Create A Poll!!
        </button>
      );
}

export default CreatePollBtn