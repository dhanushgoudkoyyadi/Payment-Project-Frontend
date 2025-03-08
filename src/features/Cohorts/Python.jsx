import React from 'react'
import { useGetUsersQuery } from '../../service/Leads'

function Python() {
    const { data: users } = useGetUsersQuery()
    
    
    const pythonStackStudents = users ? users.filter(student => 
        student.selectedCourse === "Python" || 
        (student.newCourseDetails && 
         student.newCourseDetails.some(course => course.course === "Python"))
    ) : [];

    return (
        <div className='tech-card'>
            <h1 className='tech-title'> Python Students</h1>
            <div>
                {pythonStackStudents.length > 0 ? (
                    <ul>
                        {pythonStackStudents.map(student => (
                            <li key={student._id}>
                                {student.username.toUpperCase()} 
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No Python students found</p>
                )}
            </div>
        </div>
    )
}

export default Python