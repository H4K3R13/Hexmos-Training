import React from 'react'
import  PollsTable from './PollsTable'

function MainContent({ selectedTags }) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <PollsTable selectedTags={selectedTags} />
    </div>
  );
}
export default MainContent