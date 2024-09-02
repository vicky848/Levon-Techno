

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import NavBar from './Components/NavBar';

import './App.css';
import StudentList from "./Components/StudentList";
import TeacherList from "./Components/TeacherList";
import Register from "./Components/Register";



function App() {
  return (
    <div className="App">
      <NavBar/>
      <BrowserRouter>
      <Routes>
      <Route path="/register"element = { <Register/>}/>
     
        <Route path="/"element = {<Login/>}/>
        <Route path="/dashboard" element = {<Dashboard/>}/>
        <Route path="/students" element = {<StudentList/>} />
        <Route path="/teachers" element = { <TeacherList/>} />
        
        
      </Routes>
      
      </BrowserRouter>
    
    </div>
  );
}


     
export default App;
