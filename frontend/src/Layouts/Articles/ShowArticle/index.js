import React, { useEffect } from 'react'
import Resource from '../../../Resource'
import { useParams } from 'react-router-dom'
import api from '../../../api';
import Article from './Article';

export default function ShowArticle() {
    const { id } = useParams();
    return (
        <Resource
            path={api.getArticle(id)}
            render={({ items: { article } }) => (<Article article={article} />)
            }
        />
    )
}
