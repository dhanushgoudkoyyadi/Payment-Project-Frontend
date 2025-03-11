import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useGetOneQuery } from '../../service/Leads';
import Coursedetails from './Coursedetails';
import PaymentDetails from './Paymentdetails';

import './Home.css';

function Home() {
    const token = localStorage.getItem("token");
    const userId = token ? jwtDecode(token).id : null;
    const navigate = useNavigate();
    const { data: user, error, isLoading } = useGetOneQuery(userId, { skip: !userId });


    const registeredUser = user || {};

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/Login');
    };
    const handleTech = () => {
        navigate('/Tech');

    };

    if (isLoading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error-message">Error fetching data</div>;

    return (
        <div className="home-container">

            <nav className="custom-navbar">
                <Link to="/" className="brand-name">Edupoly</Link>
                <div className="navbar-buttons">
                    <button onClick={handleTech} className="add-tech-button">Add Tech</button>
                    <button onClick={handleLogout} className="logout-button">Log Out</button>
                </div>
            </nav>



            <div>
                <div className="user-info-container">
                    <h2 className="user-info">Welcome {registeredUser.username?.toUpperCase()}</h2>
                    <h3 className="email">Email: {registeredUser.email}</h3>
                </div>

                <div className="details-container">

                    <Coursedetails />
                    <PaymentDetails />

                </div>
            </div>
        </div>
    );
}

export default Home;