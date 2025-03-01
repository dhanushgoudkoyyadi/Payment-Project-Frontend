import React from 'react';
import { useGetUsersQuery } from '../service/Leads';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FileUpload from './Student-Details/StudentPayment';
function Paymentdetails() {
    const { data: users, error, isLoading } = useGetUsersQuery();
    const navigate=useNavigate();
    const courseFee = 35000;

    const loggedInUser = useSelector((state) => state.auth?.user) || {}; 
    console.log("Logged-in User:", loggedInUser);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    console.log("Fetched Users:", users);

    const registeredUser = users?.find(user => user.mobileNumber === loggedInUser?.mobileNumber) || {};

    function Calculate(courseFee, paymentAmount) {
        const remainingAmount = courseFee - (paymentAmount || 0);
        return remainingAmount > 0 ? remainingAmount : 0;
    }

    return (
        <div>
            <h2>Payment Details</h2>
            {registeredUser.username ? ( 
                <div style={{ padding: '10px', margin: '10px 0' }}>
                    <h3>User: {registeredUser.username}</h3>
                    <h4>Course Fee: ₹{courseFee}</h4>
                    <h4>Discount: ₹{registeredUser.paymentAmount || 0}</h4>
                    <h4>Amount to be Paid: ₹{Calculate(courseFee, registeredUser.paymentAmount)}</h4>
                </div>
            ) : (
                <h3>No Payment Details Found</h3>
            )}
            <button onClick={()=>navigate('/FileUpload')}>Pay Fee</button>
        </div>
    );
}

export default Paymentdetails;
