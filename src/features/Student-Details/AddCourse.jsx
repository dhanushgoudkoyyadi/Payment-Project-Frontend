import React, { useState } from 'react';
import { useAddupMutation, useGetOneQuery } from '../../service/Leads';
import { jwtDecode } from 'jwt-decode';
import './AddCourse.css';


function AddCourse() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [addup] = useAddupMutation();

  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).id : null;
  console.log(userId)
  const { data: user, error, isLoading } = useGetOneQuery(userId, { skip: !userId });

  if (!userId) return <p>Please log in</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user data</p>;
  console.log(user);

  const validateForm = () => {
    if (!mobileNumber || !email || !selectedCourse) {
      alert('All fields are required!');
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
      const formData = {
        selectedCourse,
      };

      // Extract user ID from the stored token
      const token = localStorage.getItem('token');
      if (!token) {
        alert('User not authenticated');
        return;
      }
      if (user.mobileNumber !== mobileNumber) {
        return alert("Mobile number mismatch");
      }

      const decodedToken = jwtDecode(token);
      formData.userId = decodedToken.id || decodedToken._id;

      await addup(formData).unwrap();
      alert('Course uploaded successfully.');
      setMobileNumber('');
      setEmail('');
      setSelectedCourse('');
    } catch (error) {
      console.error('Failed to upload course:', error);
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
              <option value="Python">Python</option>
            </select>
          </div>

          <button type="submit" className="signup-button">
            {isLoading ? 'Adding...' : 'Add Course'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;
