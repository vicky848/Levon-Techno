import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };


const handleLogin = () => {
    navigate("/")
}



    const handleSubmitFormUsers = async (event) => {
        event.preventDefault();
        setError(null);
    
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            if (!response.ok) {
                throw new Error('Registration failed');
            }
    
            navigate('/login');
        } catch (error) {
            console.error('Registration Failed', error);
            setError('Registration failed. Please try again.');
        }
    };
    

    return (
        <div className='register-container'>
            <form className='form-container' onSubmit={handleSubmitFormUsers}>
                <h1 className='register-heading'>Register</h1>
                {error && <p className='error-message'>{error}</p>}
                <div>
                    <label className='label mt-4'>USERNAME</label> <br />
                    <input
                        type='text'
                        className='username'
                        value={username}
                        onChange={handleUsername}
                        placeholder='Username'
                        required
                    />
                </div>

                <div>
                    <label className='label mt-4'>PASSWORD</label> <br />
                    <input
                        type='password'
                        className='password'
                        value={password}
                        onChange={handlePassword}
                        placeholder='Password'
                        required
                    />
                </div>
                <button type='submit' className='btn btn-success mt-4'>Register</button>
                <button type='button' className='btn btn-success mt-4' onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
};

export default Register;