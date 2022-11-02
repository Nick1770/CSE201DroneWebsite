import { useEffect, useState } from 'react';

function App() {
  const [temp, setTemp] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000')
      .then(result => result.json())
      .then(json => {
        setTemp(json['data'])
      })
  }, [])

  return (
    <div className="App">
      <h2>Data from api:</h2>
      <ul>
        {temp.map(v => <li key={v}>{v}</li>)}
      </ul>
    </div>
  );
}

export default App;
