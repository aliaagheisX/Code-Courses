import React from 'react'
import AddCourseForm from '../../../components/Forms/AddCourseForm'

export default function AddCourse() {
    return (
        <section>
            <div style={{ maxWidth: '80%' }}>
                <h2>Add Course</h2>
                <AddCourseForm />
            </div>
        </section>
    )
}