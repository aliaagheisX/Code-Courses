import React from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api'
import EditLessonForm from '../../components/Forms/EditLessonForm'
import Resource from '../../Resource'

export default function EditLesson() {
    const { id } = useParams()
    return (
        <section style={{ maxWidth: '50%' }}>
            <h2>Edit Lesson</h2>
            <Resource
                path={api.getLesson(id)}
                render={({ items: { lesson } }) => <EditLessonForm lesson={lesson} />}
            />
            {/* */}
        </section>
    )
}
