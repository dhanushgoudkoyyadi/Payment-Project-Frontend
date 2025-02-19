import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Login() {
    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    //const navigate=useNavigate();
  return (
    <div className='register-container'>
        <form className='register-form'>
            <h3>Login</h3>
            <div className='form-group mb-3'>
                <label htmlFor="username">Username</label>
                <input
                 type="text"
                 className="form-control"
                 id="username" 
                 name="username"
                 onChange={(e)=>setUsername(e.target.value)}
                 value={username}
                 placeholder="Enter username"
                 required/>
            </div>
            <div className='form-group mb-3'>
                <label htmlFor="password">Password</label>
                <input
                 type="password"
                 className='form-control'
                 id='password'
                 name='password'
                 onChange={(e)=>setPassword(e.target.value)}
                 value={password}
                 placeholder='Password'
                 required
                  />
            </div>
            <button type="submit" className='btn btn-primary'>
                Login
            </button>

        </form>

    </div>
    
  )
}

export default Login