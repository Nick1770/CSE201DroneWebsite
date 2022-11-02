import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [temp, setTemp] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000')
      .then(r => r.json().then(r => {
        setTemp(r['data'])
        console.log(r)
      }))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {temp.map(v => <p key={v}>{v}</p>)}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
