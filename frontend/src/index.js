import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NavBar from './components/navbar/navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<App/>}></Route>
        <Route path="/another-page" element={<p>another page</p>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);