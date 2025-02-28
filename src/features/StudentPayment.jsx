import React, { useState } from 'react';
import { useAddMutation } from '../service/Leads';
import { jwtDecode } from 'jwt-decode';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const[amount,setAmount]=useState('');
  const [add] = useAddMutation();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilename(selectedFile.name);
    }
  };

  const handleFilenameChange = (event) => setFilename(event.target.value);
  const handleAmountChange = (event) => setAmount(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !filename || !amount) {
      alert('Please enter a taransactionId,amount and select a file.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', filename);
      formData.append('amount', amount);

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
      setAmount(null);
      document.getElementById('fileInput').value = '';
    } catch (error) {
      console.error('Failed to upload file:', error);
      alert('Failed to upload file. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          Fees
        </div>
        <div className="card-body">
          <h5 className="card-title">Toata Due Amount:xxx</h5>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="upload-form">
         
        <div className="form-group">
          <label htmlFor="filename" className="form-label">TransactionId</label>
          <input type="text" name="filename" id="filename" className="form-input" value={transactionid} onChange={handleFilenameChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="fileInput" className="form-label">Upload Screenshot</label>
          <input type="file" name="file" id="fileInput" className="form-input" onChange={handleFileChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="amount" className="form-label">Amount Paid:</label>
          <input type="text" name="amount" id="amount" className="form-input" value={amount} onChange={handleAmountChange} required />
        </div>
        
        <button type="submit" className="upload-button btn btn-primary">Upload</button>
      </form>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;


/* 
<h2 className="upload-title">Please Upload Your File</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="upload-form">
        <div className="form-group">
          <label htmlFor="filename" className="form-label">Filename</label>
          <input type="text" name="filename" id="filename" className="form-input" value={filename} onChange={handleFilenameChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="fileInput" className="form-label">Choose File</label>
          <input type="file" name="file" id="fileInput" className="form-input" onChange={handleFileChange} required />
        </div>
        <button type="submit" className="upload-button btn btn-primary">Upload</button>
      </form>*/
