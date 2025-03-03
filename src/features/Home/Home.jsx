import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'; 
import { jwtDecode } from 'jwt-decode';
import { useGetOneQuery } from '../../service/Leads';
import { useSelector } from 'react-redux';
import Coursedetails from './Coursedetails';
import PaymentDetails from './Paymentdetails';

function Home() {
    const token = localStorage.getItem("token");
    const userId = token ? jwtDecode(token).id : null;
    console.log("User ID:", userId);
    const navigate = useNavigate();
    const { data: user, error, isLoading } = useGetOneQuery(userId, { skip: !userId });
    console.log(user);
    const loggedInUser = useSelector((state) => state.auth?.user) || {};
    console.log("Logged-in User:", loggedInUser);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;
    const registeredUser = user || {};

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/Login');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
            <br />
            <div>
                <h1 className="user-info">Welcome  {registeredUser.username.toUpperCase()}</h1>
                <h3 className="email">Email: {registeredUser.email}</h3>
            </div>
            <br /><br />
            <div>
                <Coursedetails />
                <PaymentDetails />
            </div>
        </div>
    );
}

export default Home;
