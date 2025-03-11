import React from 'react';
import './Coursedetails.css';
import { useGetOneQuery } from '../../service/Leads';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

function Coursedetails() {
    const token = localStorage.getItem("token");
    const userId = token ? jwtDecode(token).id : null;
    
    const navigate = useNavigate();
    const { data: user, error, isLoading } = useGetOneQuery(userId, { skip: !userId });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    const registeredUser = user || {};
    const newCourseDetails = registeredUser.newCourseDetails || []; // Ensure it's an array

    return (
        <div className="container">
            <h3 className="title">Course Details</h3>
            {(registeredUser.selectedCourse || newCourseDetails.length > 0) ? (
                <div className="card">
                    <h5 className="text">Course: {registeredUser.selectedCourse || 'N/A'}</h5>
                    <h5 className="text">
                        New Courses:
                        <ul>
                            {newCourseDetails.map((course, index) => (
                                <li key={index}>
                                    {course.course ? course.course.toUpperCase() : 'Unknown Course'}
                                </li>
                            ))}
                        </ul>
                    </h5>
                </div>
            ) : (
                <h5 className="course-text">No Course Details Found</h5>
            )}
            <button className="button" onClick={() => navigate("/AddCourse")}>Add New Course</button>
        </div>
    );
}

export default Coursedetails;
