import React from 'react';
import mockGraphData from '../constants/mockGraphData.json';

const Graph = (data) => {
  console.log(data);
  console.log(mockGraphData);
  return (
    <iframe
      className="airtable-embed"
      src="https://airtable.com/embed/shrNPAbMywDmLbLPY?backgroundColor=blue&viewControls=on"
      frameBorder="0"
      onMouseWheel=""
      width="100%"
      height="533"
      // style={"background: transparent; border: 1px solid #ccc;"}
    ></iframe>
  );
};

export default Graph;
