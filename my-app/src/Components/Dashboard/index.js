import React from 'react'
import {useNavigate} from 'react-router-dom'
import './index.css'
const Dashboard = () => {

const naviagte = useNavigate()

const handelStudent = () => {
    naviagte("/students")

}
const handelTeacher = () => {
    naviagte("/teachers")
}



  return (
   <div className='main-container'>
     <div className='dashboard-container'>
        <h1 className='dashboard-heading'>Dashboard</h1>

        <button onClick={handelStudent} className='button-view-student'>View Student</button>
        <button onClick={handelTeacher} className='button-view-teacher' >View Teacher</button>

    </div>

   </div>
  )
}
export default Dashboard