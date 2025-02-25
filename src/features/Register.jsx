import React from 'react'
import { useState } from 'react';
import { useSignupMutation } from '../service/Leads';
import { useNavigate } from 'react-router-dom';
function Register() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [register] = useSignupMutation();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try{
            const response = await register({username,password})
            localStorage.setItem('token',response.token);

            navigate('/Mainboard')
        }
        catch(err)
        {
            alert("Register Failed.. Please try again...")
        }
        
    }
    return (
        <div className='register-container'>
            <form className='register-form' onSubmit={handleSubmit}>
                <h3>Register</h3>
                <div className='form-group mb-3'>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        placeholder="Enter username"
                        required />
                </div>
                <div className='form-group mb-3'>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className='form-control'
                        id='password'
                        name='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder='Password'
                        required
                    />
                </div>
                <div className='form-group mb-3'>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input
                        type="Password"
                        className='form-control'
                        id='confirmPassword'
                        name='confirmPassword'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        placeholder="Confirm password"
                        required />

                </div>
                <button type="submit" className='btn btn-primary'>
                    Register
                </button>

            </form>

        </div>

    )
}


export default Register