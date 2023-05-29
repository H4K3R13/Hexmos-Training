import {useNavigate} from "react-router-dom"

function CreatePollBtn() {
    const navigator = useNavigate()

    return (
        <button onClick={ () => navigator("/createpoll")} style={{padding:".5rem 1rem", background:"pink", margin:".5rem"}}>
            Create A Poll!!
        </button>
      );
}

export default CreatePollBtn