import React from 'react'
import { useGetUsersQuery } from '../../service/Leads'

function Backend() {
    const { data: users } = useGetUsersQuery()
    
    
    const backendStackStudents = users ? users.filter(student => 
        student.selectedCourse === "Backend" || 
        (student.newCourseDetails && 
         student.newCourseDetails.some(course => course.course === "backend"))
    ) : [];

    return (
        <div className='tech-card'>
            <h1 className='tech-title'>BACKEND Students</h1>
            <div>
                {backendStackStudents.length > 0 ? (
                    <ul>
                        {backendStackStudents.map(student => (
                            <li key={student._id}>
                                {student.username} 
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No Backend students found</p>
                )}
            </div>
        </div>
    )
}

export default Backend