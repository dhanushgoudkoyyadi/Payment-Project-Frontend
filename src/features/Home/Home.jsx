import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { useGetOneQuery } from '../../service/Leads';
import Coursedetails from './Coursedetails';
import PaymentDetails from './Paymentdetails';

import './Home.css';

function Home() {
    // const token = localStorage.getItem("token");
    // const userId = token ? jwtDecode(token).id : null;
    const navigate = useNavigate();
    // const { data: user, error, isLoading } = useGetOneQuery(userId, { skip: !userId });

   
    // const registeredUser = user || {};

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/Login');
    };

    // if (isLoading) return <div className="loading">Loading...</div>;
    // if (error) return <div className="error-message">Error fetching data</div>;

    return (
        <div className="home-container">
            {/* Navbar */}
            <nav className="custom-navbar">
                <Link to="/" className="brand-name">Edupoly</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <button onClick={handleLogout} className="logout-button">Log Out</button>
                    </ul>
                </div>
            </nav>
           <Coursedetails></Coursedetails>
           <PaymentDetails></PaymentDetails>
         
        </div>
    );
}

export default Home;
