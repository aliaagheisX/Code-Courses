import React from 'react'
import AddQuizForm from '../../components/Forms/AddQuizForm'

export default function AddQuiz() {
    return (
        <section>
            <div style={{ maxWidth: '80%' }}>
                <h2>Add Quiz</h2>

                <AddQuizForm />
            </div>
        </section>
    )
}