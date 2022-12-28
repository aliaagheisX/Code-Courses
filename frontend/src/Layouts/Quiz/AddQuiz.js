import React from 'react'
import { Navigate } from 'react-router-dom'
import api from '../../api'
import AddQuizForm from '../../components/Forms/AddQuizForm'
import Resource from '../../Resource'
import useToken from '../../useToken'

export default function AddQuiz() {
    const { userdata } = useToken()
    return (
        <section>
            <div style={{ maxWidth: '80%' }}>
                <h2>Add Quiz</h2>
                <Resource
                    path={api.getInstructorQuestions}
                    render={({ items: { Questions } }) => {
                        if (Questions.length === 0) return <Navigate to={'/questions/add'} replace={true} />;
                        return <AddQuizForm questions_data={Questions} />
                    }}
                    ErrorComp={<Navigate to={'/questions/add'} replace={true} />}
                />
            </div>
        </section>
    )
}