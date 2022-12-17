import React, { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import api from '../../../api';
import EditArticleForm from '../../../components/Forms/EditArticleForm';
import Resource from '../../../Resource';
import useToken from '../../../useToken';

export default function EditeArticle() {
    const { id: article_id } = useParams()
    const { id: instructor_id, isAdmin } = useToken()



    return (
        <Resource
            path={api.getArticle(article_id)}
            render={({ items: { article } }) => {
                if (!isAdmin && article.ID !== article_id)
                    return <Navigate to='/' />
                return (
                    <section>
                        <div style={{ maxWidth: '80%' }}>
                            <h2>Edit Article</h2>
                            <EditArticleForm article={article} />
                        </div>
                    </section>
                )
            }}
        />

    )
}
