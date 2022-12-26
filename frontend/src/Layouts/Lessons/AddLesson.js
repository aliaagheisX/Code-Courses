import React from 'react'
import { useParams } from 'react-router-dom'
import AddLessonForm from '../../components/Forms/AddLessonForm'

export default function AddLesson() {
    let { id } = useParams();
    if (id === undefined) id = null;
    console.log(id)
    return (
        <section style={{ maxWidth: '50%' }}>
            <h2>Add Lesson</h2>
            <AddLessonForm course_id={id} />
        </section>
    )
}
