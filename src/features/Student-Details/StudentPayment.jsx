import React, { useState } from 'react';
import './FileUpload.css';
import { useAddMutation } from '../../service/Leads';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [transactionId, setTransactionId] = useState('');
  const [filename, setFilename] = useState('');
  const [amount, setAmount] = useState('');
  const [add] = useAddMutation();
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilename(selectedFile.name);
    }
  };

  const handleTransactionIdChange = (event) => setTransactionId(event.target.value);

  const handleAmountChange = (event) => setAmount(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !filename || !amount) {
      alert('Please enter a transaction ID, amount and select a file.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', filename);
      formData.append('amount', amount);
      formData.append('transactionId', transactionId);

      // Extract user ID from the stored token
      const token = localStorage.getItem('token');
      if (!token) {
        alert('User not authenticated');
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id || decodedToken._id;
      formData.append('userId', userId);

      await add(formData).unwrap();
      alert('File uploaded successfully.');
      setFile(null);
      setFilename('');
      setAmount('');
      setTransactionId('');
      document.getElementById('fileInput').value = '';
      navigate('/Home');
    } catch (error) {
      console.error('Failed to upload file:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          Fees
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="upload-form">
            <div className="form-group">
              <label htmlFor="transactionId" className="form-label">Transaction ID</label>
              <input type="text" name="transactionId" id="transactionId" className="form-input" value={transactionId} onChange={handleTransactionIdChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="fileInput" className="form-label">Upload Screenshot</label>
              <input type="file" name="file" id="fileInput" className="form-input" onChange={handleFileChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="amount" className="form-label">Amount Paid</label>
              <input type="text" name="amount" id="amount" className="form-input" value={amount} onChange={handleAmountChange} required />
            </div>
            <button type="submit" className="upload-button">Upload</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
