import React, { useState }  from "react";

import './Register.css';
import { useSignupMutation } from "../../service/Leads";

function Register() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [selectedCourse, setSelectedCourse] = React.useState("");
  const [signup, { isLoading }] = useSignupMutation();
  
  const [paymentValues, setPaymentValues] = useState({});
  

  const validateForm = () => {
    if (!username || !mobileNumber || !gender || !email || !password || !selectedCourse) {
      alert("All fields are required!");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobileNumber)) {
      alert('Please enter a valid 10-digit mobile number.');
      return false;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('Password must be at least 8 characters long and include at least one number and one special character.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e,userID) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      const response = await signup({ username, password, mobileNumber, email, gender,  selectedCourse }).unwrap();
      localStorage.setItem('token', response.token);
      alert('Signup successful!');
      if(!paymentValues[userID])
        return alert("Enter a payment amount");
        
        

    } catch (err) {
      alert('Signup failed. Please try again.');
      

    }
  };
 
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Create Your Account</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-input"
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              placeholder="Enter a strong password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input
              id="mobileNumber"
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              className="form-input"
              placeholder="Enter your 10-digit mobile number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Gender:</label>
            <div className="gender-options">
              <label htmlFor="male">
                <input
                  id="male"
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
                Male
              </label>
              <label htmlFor="female">
                <input
                  id="female"
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
                Female
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="course">Select Your Course:</label>
            <select
              id="course"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              required
              className="form-input"
            >
              <option value="">Choose a Course</option>
              <option value="MERN">MERN Stack</option>
              <option value="MEAN">MEAN Stack</option>
              <option value="react"> Frontend with React</option>
              <option value="Angular"> Frontend with Angular</option>
              <option value="backend"> Backend</option>
              <option value="Java">Java Full Stack</option>
              <option value="devops">DevOps</option>
            </select>
          </div>

          <button type="submit" disabled={isLoading} className="signup-button">
            {isLoading ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
