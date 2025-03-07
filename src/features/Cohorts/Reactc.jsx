import React from 'react'
import { useGetUsersQuery } from '../../service/Leads'
function Reactc() {
    const { data: users } = useGetUsersQuery()
    const ReactStackStudents = users ? users.filter(student => 
        student.selectedCourse === "Frontend with React" || 
        (student.newCourseDetails && 
         student.newCourseDetails.some(course => course.course === "react"))
    ) : [];
    return (
        <div className='tech-card'>
            <h1 className='tech-title'>React Stack Students</h1>
            <div>
                {ReactStackStudents.length > 0 ? (
                    <ul>
                        {ReactStackStudents.map(student => (
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

export default Reactc