import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
