import React from 'react';
import { useGetOneQuery } from '../../service/Leads';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function PaymentDetails() {
    const navigate = useNavigate();
    const courseFee = 35000;

    // Get user ID from token
    const token = localStorage.getItem("token");
    const userId = token ? jwtDecode(token).id : null;
    console.log("User ID:", userId);

    // Fetch student payment details
    const { data: user, error, isLoading, refetch } = useGetOneQuery(userId, { skip: !userId });
    console.log("User:", user);

    // Redux state for logged-in user
    const loggedInUser = useSelector((state) => state.auth?.user) || {};
    console.log("Logged-in User:", loggedInUser);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    const registeredUser = user || {};
    const studentPayments = registeredUser.StudentPaymentDetails || [];
    const discountamount = registeredUser.paymentAmount ;
    console.log(discountamount)
    // Calculate total paid amount
    const totalPaidAmount = studentPayments.reduce((sum, payment) => sum + payment.amount, 0);
    console.log(totalPaidAmount)

    // Calculate remaining amount
    const remainingAmount = courseFee - (totalPaidAmount+discountamount);

    return (
        <div>
            <h2>Payment Details</h2>
            {registeredUser.username ? (
                <div style={{ padding: '10px', margin: '10px 0' }}>
                    <h3>Student Name: {registeredUser.username}</h3>
                    <h4>Course Fee: ₹{courseFee}</h4>
                    <h4>Discount: ₹{registeredUser.paymentAmount || 0}</h4>
                    <h4>Total Paid Amount: ₹{totalPaidAmount}</h4>
                    <h4>Amount to be Paid: ₹{remainingAmount > 0 ? remainingAmount : 0}</h4>
                </div>
            ) : (
                <h3>No Payment Details Found</h3>
            )}
            <button onClick={() => navigate("/FileUpload")}>Pay Fee</button>
        </div>
    );
}

export default PaymentDetails;
