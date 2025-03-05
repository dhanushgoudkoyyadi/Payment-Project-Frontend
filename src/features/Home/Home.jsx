import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useGetOneQuery } from '../../service/Leads';
import { useSelector } from 'react-redux';
import Coursedetails from './Coursedetails';
import PaymentDetails from './Paymentdetails';
import './Home.css';

function Home() {
    const token = localStorage.getItem("token");
    const userId = token ? jwtDecode(token).id : null;
    const navigate = useNavigate();
    const { data: user, error, isLoading } = useGetOneQuery(userId, { skip: !userId });

    const loggedInUser = useSelector((state) => state.auth?.user) || {};
    const registeredUser = user || {};

    const [isNavCollapsed, setIsNavCollapsed] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/Login');
    };

    const toggleNav = () => {
        setIsNavCollapsed(!isNavCollapsed);
    };

    if (isLoading) return <div className="loading-home">Loading...</div>;
    if (error) return <div className="error-message-home">Error fetching data</div>;

    return (
        <div className="home-container-custom">
            {/* Navbar */}
            <nav className="custom-navbar-home">
                <Link to="/" className="brand-name-home">Edupoly</Link>
                <button className="navbar-toggler-home" type="button" onClick={toggleNav}>
                    <span className="navbar-toggler-icon-home"></span>
                </button>
                <div className={`navbar-collapse-home ${isNavCollapsed ? 'active' : ''}`}>
                    <ul className="navbar-nav-home">
                        <button onClick={handleLogout} className="logout-button-home">Log Out</button>
                    </ul>
                </div>
            </nav>

            {/* Main Content */}
            <div className="main-content-home">
                <div className="component-card-home">
                    <Coursedetails />
                </div>
                <div className="component-card-home">
                    <PaymentDetails />
                </div>
            </div>
        </div>
    );
}

export default Home;