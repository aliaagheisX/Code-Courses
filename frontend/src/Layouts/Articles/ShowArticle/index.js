import React from 'react'
import Resource from '../../../Resource'
import { useParams } from 'react-router-dom'
import Thumb from '../../../components/Thumb'
import api from '../../../api';
import styles from './index.module.css'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'https://esm.sh/remark-gfm@3'
import Likes from './Likes';

export default function ShowArticle() {
    const { id } = useParams();

    return (
        <Resource
            path={api.getArticle(id)}
            render={({ items: { article } }) => {
                const {
                    ID, TITLE, AUTHORFNAME, AUTHORSNAME,
                    BODY, CREATIONDATE, DESCRIPTION, IMAGE, INSTRUCTORID, likes
                } = article
                console.log(likes)

                return (
                    <section className={styles.sec}>
                        <Likes likes={likes} />
                        <h3>{TITLE}</h3>
                        <p className={styles.desc}>{DESCRIPTION}</p>
                        <div className='tag-list'>
                            <Resource
                                path={api.getArticleTopics(ID)}
                                render={({ items: { topics } }) => (
                                    topics.map(({ NAME: tname }) => (
                                        <div key={tname} className='tag active'>{tname}</div>
                                    ))
                                )}
                                ErrorComp={<div className='tag error'>No tags</div>}
                            />
                        </div>
                        <Thumb avatar={IMAGE} />
                        <div className={styles.markW}>
                            <ReactMarkdown children={BODY} remarkPlugins={[remarkGfm]} />
                        </div>
                    </section>
                )
            }}
        />
    )
}
