import React from 'react'
import AddQuizForm from '../../components/Forms/AddQuizForm'
import Resource from '../../Resource'

export default function AddArticle() {
    return (
        <section>
            <div style={{ maxWidth: '80%' }}>
                <h2>Add Quiz</h2>

                <AddQuizForm />
            </div>
        </section>
    )
}
