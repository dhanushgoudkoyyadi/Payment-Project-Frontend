import React, { useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useAddTechMutation, useGetOneQuery } from '../../service/Leads';
import './Tech.css'; // Import the new CSS file

function Tech() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [addup] = useAddTechMutation();

  const token = localStorage.getItem('token');
  const userId = token ? jwtDecode(token).id : null;

  const { data: user, error, isLoading } = useGetOneQuery(userId, { skip: !userId });

  if (!userId) return <p>Please log in</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user data</p>;

  const validateForm = () => {
    if (!mobileNumber || selectedCourses.length === 0) {
      alert('All fields are required!');
      return false;
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobileNumber)) {
      alert('Please enter a valid 10-digit mobile number.');
      return false;
    }

    return true;
  };

  const handleCheckboxChange = (course) => {
    setSelectedCourses((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = {
        userId,
        tech: selectedCourses
      };
      console.log(formData);
      if (user.mobileNumber !== mobileNumber) {
        alert('Mobile number mismatch');
        return;
      }

      await addup(formData).unwrap();
      alert('Technologies uploaded successfully.');
      setMobileNumber('');
      setSelectedCourses([]);
    } catch (error) {
      console.error('Failed to upload Technologies:', error);
    }
  };

  return (
    <div className="tech-container">
      <div className="tech-card">
        <form onSubmit={handleSubmit} className="tech-form">
          <div className="form-group">
            <label htmlFor="mobileNumber" className="form-label">Mobile Number:</label>
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
            <label className="form-label">Select Courses:</label>
            <div className="checkbox-group">
              {['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB', 'Java', 'Python', 'DevOps'].map((tech) => (
                <label key={tech} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={tech}
                    checked={selectedCourses.includes(tech)}
                    onChange={() => handleCheckboxChange(tech)}
                    className="checkbox-input"
                  />
                  {tech}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="tech-button">
            {isLoading ? 'Adding...' : 'Add Course'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Tech;
