import React, { useState, useEffect } from 'react';
import './index.css';
import StudentItem from '../StudentItem';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({ name: '', grade: '', userId: '' });
    const [editingStudent, setEditingStudent] = useState(null);

    const handleUserId = (event) => {
        setNewStudent({ ...newStudent, userId: event.target.value });
    };

    const handleName = (event) => {
        setNewStudent({ ...newStudent, name: event.target.value });
    };

    const handleGrade = (event) => {
        setNewStudent({ ...newStudent, grade: event.target.value });
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Fetch all students
    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost:3000/students', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setStudents(data);
            } else {
                console.log('Error fetching students:', response.statusText);
            }
        } catch (error) {
            console.log('Error fetching students:', error);
        }
    };

    // Handle form submission for adding/updating student
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const method = editingStudent ? 'PUT' : 'POST';
            const url = editingStudent ? `http://localhost:3000/students/${editingStudent.student_id}` : '/students';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                },
                body: JSON.stringify(newStudent)
            });

            if (response.ok) {
                fetchStudents();
                setNewStudent({ name: '', grade: '', userId: '' });
                setEditingStudent(null);
            } else {
                console.log('Error submitting data:', response.statusText);
            }
        } catch (error) {
            console.log('Error submitting data:', error);
        }
    };

    // Handle edit action
    const handleEdit = (eachStudent) => {
        setNewStudent({ name: eachStudent.name, grade: eachStudent.grade, userId: eachStudent.user_id });
        setEditingStudent(eachStudent);
    };

    // Handle delete action
    const handleDelete = async (studentId) => {
        try {
            const response = await fetch(`http://localhost:3000/students/${studentId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });

            if (response.ok) {
                fetchStudents();
            } else {
                console.log('Error deleting student:', response.statusText);
            }
        } catch (error) {
            console.log('Error deleting student:', error);
        }
    };

    return (
        <div className='student-container'>
            <form className='form-container-student' onSubmit={handleSubmit}>
                <h1 className='student-heading'>Add Students</h1>

                <div>
                    <label className='label-student'>User ID: </label>
                    <input
                        type='text'
                        value={newStudent.userId}
                        placeholder='User Id'
                        className='student-input'
                        onChange={handleUserId}
                        required
                    />

                    <label className='label-student'>Name: </label>
                    <input
                        type='text'
                        value={newStudent.name}
                        placeholder='Name'
                        className='student-input'
                        onChange={handleName}
                        required
                    />
                    <br />

                    <label className='label-student'>Grade: </label>
                    <input
                        type='text'
                        value={newStudent.grade}
                        placeholder='Grade'
                        className='student-input'
                        onChange={handleGrade}
                        required
                    />
                </div>

                <button className='btn btn-dark' type='submit'>
                    {editingStudent ? 'Update Student' : 'Add Student'}
                </button>
            </form>

            <ul>
                {students.map((eachStudent) => (
                    <StudentItem
                        key={eachStudent.id}
                        eachDetails={eachStudent}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                ))}
            </ul>
        </div>
    );
};

export default StudentList;