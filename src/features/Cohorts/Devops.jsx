import React from 'react'
import { useGetUsersQuery } from '../../service/Leads'

function Devops() {
    const { data: users } = useGetUsersQuery()
    
    
    const devopsStackStudents = users ? users.filter(student => 
        student.selectedCourse === "Devops" || 
        (student.newCourseDetails && 
         student.newCourseDetails.some(course => course.course === "devops"))
    ) : [];

    return (
        <div className='tech-card'>
            <h1 className='tech-title'> Devops Students</h1>
            <div>
                {devopsStackStudents.length > 0 ? (
                    <ul>
                        {devopsStackStudents.map(student => (
                            <li key={student._id}>
                                {student.username.toUpperCase()} 
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No Devops students found</p>
                )}
            </div>
        </div>
    )
}

export default Devops