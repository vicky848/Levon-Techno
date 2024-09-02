import { useState, useEffect } from 'react';
import './index.css';
import TeacherItem from '../TeacherItem';

const TeacherList = () => {
    const [teachers, setTeachers] = useState([]);
    const [newTeacher, setNewTeacher] = useState({ name: '', subject: '', userId: '' });
    const [editingTeacher, setEditingTeacher] = useState(null);

    const handleUserId = (event) => {
        setNewTeacher({ ...newTeacher, userId: event.target.value });
    };

    const handleName = (event) => {
        setNewTeacher({ ...newTeacher, name: event.target.value });
    };

    const handleSubject = (event) => {
        setNewTeacher({ ...newTeacher, subject: event.target.value });
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await fetch('http://localhost:3000/teachers', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            if (!response.ok) throw new Error('Error fetching teachers');
            const data = await response.json();
            setTeachers(data);
        } catch (error) {
            console.log('Error fetching teachers', error);
        }
    };

    const handleSubmitTeacher = async (event) => {
        event.preventDefault();
        try {
            const method = editingTeacher ? 'PUT' : 'POST';
            const url = editingTeacher 
                ? `/teachers/${editingTeacher.teacher_id}`
                : '/teachers';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                },
                body: JSON.stringify(newTeacher)
            });
            
            if (!response.ok) throw new Error('Error submitting teacher data');
            
            setNewTeacher({ name: '', subject: '', userId: '' });
            setEditingTeacher(null);
            fetchTeachers();
        } catch (error) {
            console.log('Error submitting teacher data', error);
        }
    };

    const handleEditTeacher = (eachTeacher) => {
        setNewTeacher({ name: eachTeacher.name, subject: eachTeacher.subject, userId: eachTeacher.user_id });
        setEditingTeacher(eachTeacher);
    };

    const handleDeleteTeacher = async (teacherId) => {
        try {
            const response = await fetch(`http://localhost:3000/teachers/${teacherId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });

            if (!response.ok) throw new Error('Error deleting teacher');
            
            fetchTeachers();
        } catch (error) {
            console.log('Error deleting teacher', error);
        }
    };

    return (
        <div className='teacher-container'>
            <form className='form-container-teacher' onSubmit={handleSubmitTeacher}>
                <h1 className='teacher-heading'>Add Teacher</h1>
                <div>
                    <label className='teacher-label'>User ID: </label>
                    <input
                        type='text'
                        value={newTeacher.userId}
                        placeholder='User Id'
                        className='teacher-input'
                        onChange={handleUserId}
                        required
                    />
                    <label className='teacher-label'>Name: </label>
                    <input
                        type='text'
                        value={newTeacher.name}
                        placeholder='Name'
                        className='teacher-input'
                        onChange={handleName}
                        required
                    />
                    <br />
                    <label className='teacher-label'>Subject: </label>
                    <input
                        type='text'
                        value={newTeacher.subject}
                        placeholder='Subject'
                        className='teacher-input'
                        onChange={handleSubject}
                        required
                    />
                </div>
                <button type='submit' className='btn btn-dark'>
                    {editingTeacher ? 'Update Teacher' : 'Add Teacher'}
                </button>
            </form>

            <ul>
                {teachers.map((eachTeacher) => (
                    <TeacherItem
                        key={eachTeacher.id}
                        eachDetails={eachTeacher}
                        handleEditTeacher={handleEditTeacher}
                        handleDeleteTeacher={handleDeleteTeacher}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TeacherList;