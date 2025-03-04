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
    const newcourse=registeredUser.newCourseDetails

    return (
        <div className="container">
            <h3 className="title">Course Details</h3>
            {(registeredUser.selectedCourse || newcourse.course) ? (
                <div className="card">
                    <h5 className="text">Course: {registeredUser.selectedCourse}
                        
                    </h5>
                    <h5 className="text">NewCourses:   {newcourse.map((course)=>(
                        <li>{course.course.toUpperCase()}</li>
                    ))}</h5>
                    
                </div>
            ) : (
                <h5 className="course-text">No Course Details Found</h5>
            )}
            <button className="button" onClick={() => navigate("/AddCourse")}>Add New Course</button>
        </div>
    );
}

export default Coursedetails;
