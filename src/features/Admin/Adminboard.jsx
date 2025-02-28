import React, { useState } from 'react';
import { useAddPaymentMutation, useGetUsersQuery } from '../../service/Leads';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Adminboard() {
  const { data: users, error, isLoading } = useGetUsersQuery();
  const [addPayment] = useAddPaymentMutation();
  const [paymentValues, setPaymentValues] = useState({});
  const [search, setSearch] = useState('');
  const navigate=useNavigate();
  const handleChange = (userId, value) => {
    setPaymentValues((prevValues) => ({
      ...prevValues,
      [userId]: value,
    }));
  };

  const handleSubmit = async (userId) => {
    if (!paymentValues[userId]) return alert('Enter a payment amount');
    try {
      const amount = Number(paymentValues[userId]);
      if (isNaN(amount) || amount <= 0) {
        return alert('Please enter a valid payment amount');
        navigate('/SpFailed');
      }

      await addPayment({ userId, amount }).unwrap();
      alert('Payment added successfully!');

      setPaymentValues((prevValues) => ({ ...prevValues, [userId]: '' }));
    } catch (error) {
      console.error('Error adding payment:', error);
      alert('Failed to add payment.');
    }
  };

  const filteredUsers = users?.filter(user => 
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='container mt-5'>
      <h1 className='text-center mb-4'>Registered Students</h1>
      <div className='mb-3 text-center'>
      <input
  type="text"
  placeholder="Search students..."
  className="form-control search-box"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
      </div>
      {isLoading && <p className='text-center text-muted'>Loading Students...</p>}
      {error && <p className='text-center text-danger'>Error fetching Students</p>}
      <div className='row'>
        {filteredUsers?.map((user) => (
          <div key={user._id} className='col-md-4 mb-4'>
            <div className='card shadow-sm'>
              <div className='card-body text-center'>
                <h5 className='card-title'>{user.username}</h5>
                <h6>Email:<p>{user.email}</p></h6>
                <h6>Mobile:<p>{user.mobileNumber}</p></h6>
                <h6>Course:{user.selectedCourse}</h6>
                <input
                  type='number'
                  value={paymentValues[user._id] || ''}
                  onChange={(e) => handleChange(user._id, e.target.value)}
                  placeholder='Enter payment'
                  className='form-control mt-3 text-center'
                />
                <button 
                  onClick={() => handleSubmit(user._id)} 
                  className='btn btn-primary mt-3'
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Adminboard;
