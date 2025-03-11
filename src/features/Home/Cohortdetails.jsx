import React from 'react';
import './Coursedetails.css';
import { useGetOneQuery } from '../../service/Leads';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

function Cohortdetails() {
    const token = localStorage.getItem("token");
    const userId = token ? jwtDecode(token).id : null;
    
    const navigate = useNavigate();
    const { data: user, error, isLoading } = useGetOneQuery(userId, { skip: !userId });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    const cohortUser = user || {};
    const newCohortDetails = cohortUser.Technologies|| []; // Ensure it's an array
    console.log(cohortUser);
    console.log(newCohortDetails)

    return (
        <div className="container">
            <h3 className="title">Cohort Details</h3>
            {(newCohortDetails.length > 0) ? (
                <div className="card">
                    
                    <h5 className="text">
                        Cohorts :
                        <ul>
                            {newCohortDetails.map((cohort, index) => (
                                <li key={index}>
                                    {cohort.technologies ? cohort.technologies: ''}
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
