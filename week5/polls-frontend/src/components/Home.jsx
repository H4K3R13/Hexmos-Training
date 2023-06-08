import { useState, createContext } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

export const SelectedTagsContext = createContext();

function Home() {

  const [selectedTags, setSelectedTags] = useState([]);
  //Dmmy

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SelectedTagsContext.Provider value={{ selectedTags, setSelectedTags }}>
        <Sidebar />
        <MainContent />
      </SelectedTagsContext.Provider>
    </div>
  );
}

export default Home;