import React from 'react'

const TeacherItem = ({eachTeacher,handelEditTeacher, handelDeleteTeacher}) => {
    const {eachDetails} = eachTeacher
    const{teacher_id, name, subject}= eachDetails

  return (
    <div>
    <li className='list-container'>
        <p className='item'>{teacher_id}</p>
        <p className='item'>{name}</p>
        <p className='item'>{subject}</p>
        <button className='btn btn-success' onClick={()=>handelEditTeacher(eachTeacher)}>Edit</button>
        <button className='btn btn-danger' onClick={()=>handelDeleteTeacher(eachTeacher.id)}>Delete</button>


    </li>



    </div>
  )
}
export default TeacherItem