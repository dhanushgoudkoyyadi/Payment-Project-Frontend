import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import AddCourse from './AddCourse';
function Navbar() {
  return (
    <div className="Navbar">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Edupoly</Link>
      <button 
        className="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/Register">Register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Admin">Admin</Link>
          </li>
          
        </ul>
      </div>
    </nav>
    
    </div>
    
  );
}

export default Navbar;
