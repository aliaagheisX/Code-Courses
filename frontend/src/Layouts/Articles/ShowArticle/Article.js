import React, { useEffect } from 'react'
import styles from './index.module.css'
import Thumb from '../../../components/Thumb'
import Resource from '../../../Resource'
import api from '../../../api';

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'https://esm.sh/remark-gfm@3'
import Likes from './Likes';

export default function Article({ article }) {
    const {
        ID, TITLE, AUTHORFNAME, AUTHORSNAME,
        BODY, CREATIONDATE, DESCRIPTION, IMAGE, INSTRUCTORID, likes
    } = article
    const create_date = new Date(CREATIONDATE).toDateString().split(' ').slice(1).join(' ');

    useEffect(() => {
        fetch('')
    }, [])

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
                <div className={styles.footer}>
                    <h4>By {AUTHORFNAME === null ? 'Unknown' : `${AUTHORFNAME} ${AUTHORSNAME}`}</h4>
                    <div>at {create_date}</div>
                </div>
            </div>

        </section>
    )
}
