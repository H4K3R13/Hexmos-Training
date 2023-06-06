import { useState } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
function Home() {
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSelectedTagsChange = (tags) => {
    setSelectedTags(tags);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Sidebar selectedTags={selectedTags} onSelectedTagsChange={handleSelectedTagsChange} />
      <MainContent selectedTags={selectedTags} />
    </div>
  );
}

export default Home;