import './App.css';
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/layout';
import Calendar from './components/calendar/calendar';
import Login from './components/login/login';
import Register from './components/register/register';
import Home from './components/home/home';
import Attendance from './components/attendance/attendance';
import Members from './components/members/members'
import Questions from './components/questions/questions';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>

        <Route path="/" element={<Home/>}/>
        <Route path="/calendar" element={<Calendar/>}/>
        <Route path="/members" element={<Members/>}/>
        <Route path="/attendance" element={<Attendance/>}/>
        <Route path="/answer" element={<Questions/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        <Route path="*" element={<h1>Unknown Route</h1>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
