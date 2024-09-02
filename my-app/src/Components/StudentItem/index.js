import React from 'react'

const StudentItem = ({eachStudent, handelEdit, handelDelete}) => {
    const {eachDetails} = eachStudent
    const{student_id, name, grade}= eachDetails

  return (
    <div>
    <li className='list-container'>
        <p className='item'>{student_id}</p>
        <p className='item'>{name}</p>
        <p className='item'>{grade}</p>
        <button className='btn btn-success' onClick={()=>handelEdit(eachStudent)}>Edit</button>
        <button className='btn btn-danger m-2' onClick={()=>handelDelete(eachStudent.id)}>Delete</button>


    </li>



    </div>
  )
}
export default StudentItem