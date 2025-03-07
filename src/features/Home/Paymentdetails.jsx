import React from 'react';
import './Paymentdetails.css';
import { useGetOneQuery } from '../../service/Leads';

import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";



function PaymentDetails() {

    const navigate = useNavigate();
    const courseFee = 35000;



    // Get user ID from token

    const token = localStorage.getItem("token");

    const userId = token ? jwtDecode(token).id : null;



    // Fetch student payment details
    const { data: user, error, isLoading } = useGetOneQuery(userId, { skip: !userId });



    

    if (isLoading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error-message">Error fetching data</div>;



    const registeredUser = user || {};

    const studentPayments = registeredUser.StudentPaymentDetails || [];
    const discountAmount = registeredUser.paymentAmount || 0;

    // Calculate total paid amount

    const totalPaidAmount = studentPayments.reduce((sum, payment) => sum + payment.amount, 0);



    // Calculate remaining amount
    const remainingAmount = courseFee - (totalPaidAmount + discountAmount);



    return (
        <div className="container">
            <h2 className="title">Payment Details</h2>
            {registeredUser.username ? (
                <div className="card">
                    <h3 className="text">Student Name: {registeredUser.username}</h3>
                    <h4 className="text">Course Fee: ₹{courseFee}</h4>
                    <h4 className="text">Discount: ₹{discountAmount}</h4>
                    <h4 className="text">Total Paid Amount: ₹{totalPaidAmount}</h4>
                    <h4 className="text">Amount to be Paid: ₹{remainingAmount > 0 ? remainingAmount : 0}</h4>
                </div>

            ) : (
                <h3 className="text">No Payment Details Found</h3>
            )}
            <button className="button" onClick={() => navigate("/FileUpload")}>Pay Fee</button>
        </div>

    );

}



export default PaymentDetails;