import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Login = () => {
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

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        setError(null); // Reset error state

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username:username, password:password}),
            });

            if (!response.ok) {
                throw new Error('Login Failed');
            }

            const data = await response.json();
            localStorage.setItem('jwtToken', data.jwtToken);
            navigate('/dashboard');
             
        } catch (error) {
            console.error('Login Failed', error);
            setError('Login failed. Please check your username and password.');
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className='login-container'>
            <form className='form-container' onSubmit={handleSubmitForm}>
                <h1 className='login-heading'>Login</h1>
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

                <button type='submit' className='btn btn-success mt-4'>Login</button>
                <button type='button' className='btn btn-success mt-4' onClick={handleRegister}>Register</button>
            </form>
        </div>
    );
};

export default Login;