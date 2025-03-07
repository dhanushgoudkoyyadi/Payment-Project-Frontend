import React from 'react'
import { useGetUsersQuery } from '../../service/Leads'

function Angular() {
    const { data: users } = useGetUsersQuery()
    
    
    const javaStackStudents = users ? users.filter(student => 
        student.selectedCourse === "Java Full Stack" || 
        (student.newCourseDetails && 
         student.newCourseDetails.some(course => course.course === "Java"))
    ) : [];

    return (
        <div>
            <h1>JAVA FULL Stack Students</h1>
            <div>
                {javaStackStudents.length > 0 ? (
                    <ul>
                        {javaStackStudents.map(student => (
                            <li key={student._id}>
                                {student.username} 
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No Java FullStack students found</p>
                )}
            </div>
        </div>
    )
}

export default Angular