import React,{useState} from 'react'
import { useAddMutation } from '../../service/Leads';



function AddCourse() {
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const[addup,{isLoading}]=useAddMutation();


    const validateForm = () => {
        if ( !mobileNumber || !email || !selectedCourse) {
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
    
        
        return true;
      };
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        try {
          const response = await addup({  mobileNumber, email, selectedCourse }).unwrap();
          localStorage.setItem('token', response.token);
          alert('Course added successfully!');
        } catch (err) {
          alert('Course added failed. Please try again.');
        }
      };

  return (
    <div className="signup-container">
    <div className="signup-card">
      <form onSubmit={handleSubmit} className="signup-form">

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
            <option value="react">Frontend with React</option>
            <option value="Angular">Frontend with Angular</option>
            <option value="backend">Backend</option>
            <option value="Java">Java Full Stack</option>
            <option value="devops">DevOps</option>
          </select>
        </div>

        <button type="submit" disabled={isLoading} className="signup-button">
          {isLoading ? "Adding..." : "AddCourse"}
        </button>
      </form>
      
      <div className="image-sections">
        <img src={register1} alt="Register" className="register-image" /> {/* Corrected reference */}
      </div>
    </div>
  </div>
  )
}

export default AddCourse