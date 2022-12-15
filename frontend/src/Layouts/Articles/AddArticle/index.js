import React from 'react'
import AddArticleForm from '../../../components/Forms/AddArticleForm'

export default function AddArticle() {
    return (
        <section>
            <div style={{ maxWidth: '80%' }}>
                <h2>Add Article</h2>
                <AddArticleForm />
            </div>
        </section>
    )
}
