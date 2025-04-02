import React, { useState, useEffect } from 'react';
import './Coursedetails.css';
import { useGetOneQuery } from '../../service/Leads';

import { jwtDecode } from "jwt-decode";

function Cohortdetails() {
    const token = localStorage.getItem("token");
    const userId = token ? jwtDecode(token).id : null;
    
    const { data: user, error, isLoading } = useGetOneQuery(userId, { skip: !userId });
    
    // State to track which technologies are visible
    const [visibleTechs, setVisibleTechs] = useState([]);
    
    // Get cohort details
    const cohortUser = user || {};
    const newCohortDetails = cohortUser?.Technologies || []; // Ensure it's an array
    
    // Effect to animate technologies appearing one by one
    // This is now placed before any conditional returns
    useEffect(() => {
        if (newCohortDetails.length > 0) {
            const timeoutIds = [];
            
            newCohortDetails.forEach((_, index) => {
                const timeoutId = setTimeout(() => {
                    setVisibleTechs(prev => [...prev, index]);
                }, 500 * (index + 1)); // Each tech appears after 500ms * index
                
                timeoutIds.push(timeoutId);
            });
            
            // Cleanup function to clear all timeouts
            return () => {
                timeoutIds.forEach(id => clearTimeout(id));
            };
        }
    }, [newCohortDetails.length]); // Only re-run if the length changes
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;
    
    return (
        <div className="container">
            <h3 className="title">Cohort Details</h3>
            {(newCohortDetails.length > 0) ? (
                <div className="card">
                    <h5 className="text">
                        Cohorts :
                        <br></br>
                        <ul>
                            {newCohortDetails.map((cohort, index) => (
                                <li 
                                    key={index}
                                    className={`tech-item ${visibleTechs.includes(index) ? 'visible' : 'hidden'}`}
                                >
                                    {cohort.technologies ? cohort.technologies : ''}
                                </li>
                            ))}
                        </ul>
                    </h5>
                </div>
            ) : (
                <h5 className="course-text">No Course Details Found</h5>
            )}
        </div>
    );
}

export default Cohortdetails;