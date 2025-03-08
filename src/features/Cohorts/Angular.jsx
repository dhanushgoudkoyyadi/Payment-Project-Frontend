import React from 'react'
import { useGetUsersQuery } from '../../service/Leads'

function Angular() {
    const { data: users } = useGetUsersQuery()
    
    
    const meanStackStudents = users ? users.filter(student => 
        student.selectedCourse === "Frontend with Angular" || 
        (student.newCourseDetails && 
         student.newCourseDetails.some(course => course.course === "Angular"))
    ) : [];
    return (
        <div className='tech-card'>
            <h1 className='tech-title'> ANGULAR </h1>
            <div>
                {meanStackStudents.length > 0 ? (
                    <ul>
                        {meanStackStudents.map(student => (
                            <li key={student._id}>
                                {student.username.toUpperCase()} 
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No Angular students found</p>
                )}
            </div>
        </div>
    )
}

export default Angular