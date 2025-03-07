import React from 'react'
import { useGetUsersQuery } from '../../service/Leads'

function Mean() {
    const { data: users } = useGetUsersQuery()
    
    
    const meanStackStudents = users ? users.filter(student => 
        student.selectedCourse === "MEAN Stack" || 
        (student.newCourseDetails && 
         student.newCourseDetails.some(course => course.course === "MEAN"))
    ) : [];

    return (
        <div className='tech-card'>
            <h1 className='tech-title'>MEAN Stack Students</h1>
            <div>
                {meanStackStudents.length > 0 ? (
                    <ul>
                        {meanStackStudents.map(student => (
                            <li key={student._id}>
                                {student.username} 
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No React students found</p>
                )}
            </div>
        </div>
    )
}

export default Mean