import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'; 
import AddCourse from '../Student-Details/AddCourse';
import Paymentdetails from "./Paymentdetails"
function Home() {
    const navigate = useNavigate();
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
            <AddCourse />
            <Paymentdetails></Paymentdetails>
        </div>
    )
}

export default Home;
