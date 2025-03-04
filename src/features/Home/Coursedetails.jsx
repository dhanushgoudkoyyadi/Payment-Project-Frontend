import React from 'react';
import './Coursedetails.css';
import { useGetOneQuery } from '../../service/Leads';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

function Coursedetails() {
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

    return (
        <div className="course-container">
            <h3 className="course-title">Course Details</h3>
            {registeredUser.selectedCourse ? (
                <div className="course-card">
                    <h5 className="course-text">Course: {registeredUser.selectedCourse}</h5>
                    <h5 className="course-text">New Course: {registeredUser.selectedCourse}</h5>
                    <button className="course-button" onClick={() => navigate("/AddCourse")}>Add New Course</button>
                </div>
            ) : (
                <h5 className="course-text">No Course Details Found</h5>
            )}
        </div>
    );
}

export default Coursedetails;
