import React from 'react'

function Signup() {
    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    const [confirmPassword,setConfirmPassword]=useState();
    const [error,setError]=useState();
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(password!==confirmPassword){
            setError("Passwords do not match!");
            return;
        }
        setError("");
        console,log({username,password});
    }
  return (
    <div className='register-container'>
    <form className='register-form'>
        <h3>Register</h3>
        <div className='form-group mb-3'>
            <label htmlFor="username">Username</label>
            <input
             type="text"
             className="form-control"
             id="username" 
             name="username"
             onChange={(e)=>setUsername(e.target.value)}
             value="username"
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


export default Signup