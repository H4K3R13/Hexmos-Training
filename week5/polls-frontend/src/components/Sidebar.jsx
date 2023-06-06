import CreatePollBtn from "./CreatePollBtn"
import Filter from "./Filter"

function Sidebar({ selectedTags, onSelectedTagsChange }) {
  return (
    <div>
      <CreatePollBtn />
      <Filter selectedTags={selectedTags} onSelectedTagsChange={onSelectedTagsChange} />
    </div>
  );
}

export default Sidebar