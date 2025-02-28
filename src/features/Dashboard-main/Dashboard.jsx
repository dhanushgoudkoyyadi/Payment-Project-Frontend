import React from 'react';
import Navbar from '../Student-Details/Navbar';
import { Outlet } from 'react-router-dom';
import Main from "./Main"
function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <Outlet />
      </div>
      <Main></Main>
    </div>
  );
}

export default Dashboard;
