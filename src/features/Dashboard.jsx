import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Main from './Dashboard-main/Main';
import Cards from './Dashboard-main/Cards';

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <Outlet />
      </div>
      <Main></Main>
      <Cards></Cards>
    </div>
  );
}

export default Dashboard;
