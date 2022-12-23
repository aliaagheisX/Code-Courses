import React from 'react'
import CourseComponent from '../../components/CourseComponent'
import CustomCarsoul from '../../components/CustomCarsoul'

export default function Courses({ coursesEnrolled }) {
    return (
        <section>
            <h3>Courses</h3>
            <CustomCarsoul
                items={
                    coursesEnrolled.map((course) => (
                        <CourseComponent course={course} key={course.ID} />
                    ))
                }
            />
        </section>
    )
}
