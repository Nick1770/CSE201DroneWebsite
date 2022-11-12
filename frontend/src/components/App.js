import React, { useEffect, useState } from 'react';
const apiURL = process.env.REACT_APP_API_URL

function App() {
  const [nums, setNums] = useState([])

  useEffect(() => {
    fetch(apiURL)
      .then(result => result.json())
      .then(json => {
        setNums(json['data'])
      })
  }, [])

  return (
      <div className="App">
        <h2>Data from api:</h2>
        <ul>
          {nums.map(v => <li key={v}>{v}</li>)}
        </ul>
      </div>
  );
}

export default App;
