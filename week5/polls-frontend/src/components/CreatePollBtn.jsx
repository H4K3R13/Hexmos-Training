function CreatePollBtn() {
    const shoot = () => {
        alert("Poll is not created :) !!");
      }

    return (
        <button onClick={shoot} style={{padding:".5rem 1rem", background:"pink", margin:".5rem"}}>
            Create A Poll!!
        </button>
      );
}

export default CreatePollBtn