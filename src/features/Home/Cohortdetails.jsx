import React, { useEffect, useState } from 'react';
import './Coursedetails.css';
import { useGetAllCohortsListsQuery, useGetOneQuery } from '../../service/Leads';
import { jwtDecode } from "jwt-decode";

function Cohortdetail() {
    const token = localStorage.getItem("token");
    const userId = token ? jwtDecode(token).id : null;
    
    const { data: user, isLoading: userLoading } = useGetOneQuery(userId, { skip: !userId });
    const { data: cohorts, isLoading: cohortsLoading } = useGetAllCohortsListsQuery();
    
    const [matchedCohorts, setMatchedCohorts] = useState([]);
    
    // Find matching cohorts when data is available
    useEffect(() => {
        if (user && cohorts && user.mobileNumber) {
            // Filter cohorts where student phone number matches
            const matched = cohorts.filter(cohort => 
                cohort.students && cohort.students.some(student => 
                    student.name === user.mobileNumber
                )
            );
            setMatchedCohorts(matched);
        }
    }, [user, cohorts]);
    
    if (userLoading || cohortsLoading) return <div>Loading...</div>;
    
    return (
        <div className="container">
            <h3 className="title">Enrolled Cohorts</h3>
            
            {/* Matched Cohorts */}
            {matchedCohorts.length > 0 ? (
                <div className="card">
                    <ul className="cohort-list">
                        {matchedCohorts.map((cohort) => (
                            <li key={cohort._id} className="cohort-item">
                                {cohort.title}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="card">
                    <h5 className="course-text">No enrolled cohorts found</h5>
                </div>
            )}
        </div>
    );
}

export default Cohortdetail;