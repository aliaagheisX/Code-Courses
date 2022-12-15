import React from 'react'
import Resource from '../../../Resource'
import { useParams } from 'react-router-dom'
import api from '../../../api';
export default function ShowArticle() {
    const { id } = useParams();
    return (
        <Resource
            path={api.getArticle(id)}
            render={({ items: { article } }) => {
                const {
                    ID, TITLE, AUTHORFNAME, AUTHORSNAME,
                    BODY, CREATIONDATE, DESCRIPTION, IMAGE, INSTRUCTORID
                } = article

                return (
                    <section>
                        <h3>{TITLE}</h3>
                    </section>
                )
            }}
        />
    )
}
