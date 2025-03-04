import React, { useState } from 'react';
import { useAddPaymentMutation, useGetUsersQuery } from '../../service/Leads';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Adminboard() {
  const { data: users, error, isLoading } = useGetUsersQuery();
  const [addPayment] = useAddPaymentMutation();
  const [paymentValues, setPaymentValues] = useState({});
  const [paymentTypes, setPaymentTypes] = useState({});
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const courseFees = {
    "MEAN Stack": 35000,
    "MERN Stack": 35000,
    "Frontend with Angular": 25000,
    
  };
  const handleChange = (userId, value) => {
    setPaymentValues((prevValues) => ({
      ...prevValues,
      [userId]: value,
    }));
  };

  const handleTypeChange = (userId, type) => {
    setPaymentTypes((prevTypes) => ({
      ...prevTypes,
      [userId]: type,
    }));
    setPaymentValues((prevValues) => ({
      ...prevValues,
      [userId]: '', 
    }));
  };


  const handleSubmit = async (userId, selectedCourse) => {
    if (!selectedCourse || !courseFees[selectedCourse]) {
      alert("Invalid course selection! Cannot determine course fee.");
      return;
    }

    const totalFee = courseFees[selectedCourse]; 
    let value = paymentValues[userId];

    if (!value) {
      alert("Please enter a payment amount or percentage");
      return;
    }

    let amount;
    if (paymentTypes[userId] === "percentage") {
      const percentage = parseFloat(value);
      if (isNaN(percentage) || percentage <= 0 || percentage > 100) {
        alert("Enter a valid percentage (1-100)");
        return;
      }
      amount = (percentage / 100) * totalFee;
    } else {
      amount = parseFloat(value);
      if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
      }
    }

    if (amount > totalFee) {
      alert(`Payment amount cannot exceed ₹${totalFee}`);
      return;
    }

    try {
      await addPayment({ userId, amount, totalFee }).unwrap();
      alert(`Payment of ₹${amount.toFixed(2)} discount offered! Total Fee: ₹${totalFee}`);
      setPaymentValues((prevValues) => ({ ...prevValues, [userId]: "" }));
    } catch (error) {
      console.error("Error adding payment:", error);
      alert("Failed to add payment.");
    }
  };

  const filteredUsers = users?.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      
      <div className="row justify-content-center">
        <div className="text-center">
          <h1 className="position-fixed top-0 w-100 bg-light py-3 shadow" style={{ zIndex: 1000 }}>
            Registered Students
          </h1>
        </div>
      </div>


      <div className="row justify-content-center mb-4 mt-5">
        <div className="col-md-6">
          <input
            type="text"
            placeholder="Search students..."
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {isLoading && <p className="text-center text-muted">Loading Students...</p>}
      {error && <p className="text-center text-danger">Error fetching Students</p>}

   
      <div className="row" style={{ maxHeight: '500px', overflowY: 'auto' }}>
        {filteredUsers?.map((user) => {
          const totalFee = courseFees[user.selectedCourse] || "Not Assigned";
          return (
            <div key={user._id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">{user.username}</h5>
                  <h6>Email: <span>{user.email}</span></h6>
                  <h6>Mobile: <span>{user.mobileNumber}</span></h6>
                  <h6>Course: <span>{user.selectedCourse}</span></h6>
                  <h6>Total Fee: <span>₹{totalFee !== "Not Assigned" ? totalFee : "Not Available"}</span></h6>

                  <select
                    className="form-control mt-3"
                    value={paymentTypes[user._id] || 'amount'}
                    onChange={(e) => handleTypeChange(user._id, e.target.value)}
                  >
                    <option value="amount">Enter Amount (₹)</option>
                    <option value="percentage">Enter Percentage (%)</option>
                  </select>

                  
                  <input
                    type="number"
                    value={paymentValues[user._id] || ''}
                    onChange={(e) => handleChange(user._id, e.target.value)}
                    placeholder={paymentTypes[user._id] === 'percentage' ? 'Enter percentage (%)' : 'Enter amount (₹)'}
                    className="form-control mt-2 text-center"
                  />

                  <button
                    onClick={() => handleSubmit(user._id, user.selectedCourse)}
                    className="btn btn-primary mt-3"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Adminboard;
