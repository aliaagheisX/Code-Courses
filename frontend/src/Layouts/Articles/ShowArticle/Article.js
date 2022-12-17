import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import Thumb from '../../../components/Thumb'
import Resource from '../../../Resource'
import api from '../../../api';

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'https://esm.sh/remark-gfm@3'
import Likes from './Likes';
import useToken from '../../../useToken'
import { json } from 'react-router-dom';
import Options from './Options';
import Comments from './Comments';

export default function Article({ article }) {
    console.log(article)
    const { token } = useToken()
    const {
        ID, TITLE, AUTHORFNAME, AUTHORSNAME,
        BODY, CREATIONDATE, DESCRIPTION, IMAGE, INSTRUCTORID
    } = article.article
    const create_date = new Date(CREATIONDATE).toDateString().split(' ').slice(1).join(' ');

    useEffect(() => {
        const UserReadArticle = async () => {
            try {
                const res = await fetch(api.userReadArticle(ID), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'token': token },
                    body: JSON.stringify({})
                });
                const data = await res.json();

                if (!res.ok) throw data.message

                console.log("success", data)
            }
            catch (err) {
                console.log("error", err)
            }
        }

        UserReadArticle()

    }, [])

    return (
        <section className={styles.sec}>
            <Options id={ID} instructor_id={INSTRUCTORID} />
            <Likes likes={article.likes} views={article.articleReadCount} a_id={ID} />
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

            <Comments />

        </section>
    )
}
