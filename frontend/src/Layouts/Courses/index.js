import React from 'react'
import InstructorProtectedComponent from '../../components/InstructorProtectedComponent'
import Resource from '../../Resource'
import { NavLink } from 'react-router-dom'
import api from '../../api'
import CourseComponent from '../../components/CourseComponent'
export default function Courses() {

    return (
        <section>
            <h2>Courses</h2>
            <InstructorProtectedComponent
                render={<NavLink to='add'><button className='btnS' >Add Course</button></NavLink>}

                replace={<></>}
            />
            <Resource
                path={api.getAllCourses}
                render={({ items: { courses } }) => (
                    <div className='elementCont' >
                        {
                            courses.map((course) => (
                                <CourseComponent course={course} key={course.ID} />
                            ))
                        }
                    </div>
                )}

                ErrorComp={<></>}
            />
            {/*  */}
        </section>
    )
}
