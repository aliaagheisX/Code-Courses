import React from 'react'
import AddLessonForm from '../../components/Forms/AddLessonForm'

export default function AddLesson() {
    return (
        <section style={{ maxWidth: '50%' }}>
            <h2>Add Lesson</h2>
            <AddLessonForm course_id={null} />
        </section>
    )
}
