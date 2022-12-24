import React from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../api'
import EditCourseForm from '../../../components/Forms/EditCourseForm'
import Resource from '../../../Resource'

export default function AddCourse() {
    const { id } = useParams();
    return (
        <Resource
            path={api.getCourse(id)}
            render={({ items }) => (
                <section>
                    <div style={{ maxWidth: '80%' }}>
                        <h2>Edit Course</h2>
                        <EditCourseForm course={items} />
                    </div>
                </section>)
            }
        />

    )
}