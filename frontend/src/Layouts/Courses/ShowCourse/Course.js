import React from 'react'
import styles from './index.module.css'
import Thumb from '../../../components/Thumb'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'https://esm.sh/remark-gfm@3'
import useToken from '../../../useToken'
import Options from './Options';

export default function Course({ course }) {

    const {
        ID, TITLE, INSTRUCTORFNAME, INSTRUCTORSNAME,
        PREREQUISITES, CREATIONDATE, DESCRIPTION, IMAGE, INSTRUCTORID, enrolls_count
    } = course.course
    const create_date = new Date(CREATIONDATE).toDateString().split(' ').slice(1).join(' ');

    console.log(course)



    return (
        <section className={styles.sec}>
            <Options id={ID} instructor_id={INSTRUCTORID} />
            <div className={styles.stLike}>

                <span className={`${styles.vsCont}`}>
                    <span className={styles.stl}>{enrolls_count} </span>
                    <span className="material-symbols-outlined">
                        group
                    </span>
                </span>
            </div>
            <h3>{TITLE}</h3>
            <p className={styles.desc}>{DESCRIPTION}</p>
            <div className='tag-list'>
                {course.topics.map(({ NAME, TID }) => <div key={TID} className='tag active'>{NAME}</div>)}
            </div>

            <Thumb avatar={IMAGE} />
            <div className={styles.markW}>
                <h2>Prerequisite</h2>
                <ReactMarkdown children={PREREQUISITES} remarkPlugins={[remarkGfm]} />
                <div className={styles.footer}>
                    <h4>By {INSTRUCTORFNAME === null ? 'Unknown' : `${INSTRUCTORFNAME} ${INSTRUCTORSNAME}`}</h4>
                    <div>at {create_date}</div>
                </div>

                {/* comments */}
                {/* <section className={styles.comment_sec}>
                        <h5>Comments</h5>
                        <Resource
                            path={api.getArticlComments(ID)}
                            ErrorComp={<ShowComments article_id={ID} Initialcomments={[]} />}
                            render={({ items: { comments } }) => <ShowComments article_id={ID} Initialcomments={comments} />}
                        />


                    </section> */}
            </div>


        </section>
    )
}
