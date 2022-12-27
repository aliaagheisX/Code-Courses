import React from 'react'
import styles from './index.module.css'
import Thumb from '../../../components/Thumb'
import Options from './Options';
import useToken from '../../../useToken'
import Stats from './Stats';

export default function Quiz({ quiz: { quiz, questions, choices, topics, score } }) {

    const { userdata } = useToken()
    const {

        ID, TITLE, INSTRUCTORFNAME, INSTRUCTORSNAME,
        CREATIONDATE, DESCRIPTION, IMAGE, INSTRUCTORID, numOfStudents, numOfQuestions, MAXSCORE
    } = quiz
    console.log(score)
    const create_date = new Date(CREATIONDATE).toDateString().split(' ').slice(1).join(' ');

    const mappedChoices = {};
    choices.forEach((c) => mappedChoices[c.ID] = { body: c.BODY })

    return (
        <section className={styles.sec}>
            <Options score={score} id={ID} instructor_id={INSTRUCTORID} />

            <Stats numOfQuestions={numOfQuestions} numOfStudents={numOfStudents} />
            <h3>{TITLE}</h3>
            <p className={styles.desc}>{DESCRIPTION}</p>
            {
                score && <div className='tag-list'>
                    <div className='tag error'>{score.SCORE} / {MAXSCORE}</div>
                </div>
            }
            <div className='tag-list'>
                {topics.map(({ NAME, TID }) => <div key={TID} className='tag active'>{NAME}</div>)}
            </div>
            <Thumb avatar={IMAGE} />

            <div className={styles.markW}>

                <div className={styles.footer}>
                    <h4>By {INSTRUCTORFNAME === null ? 'Unknown' : `${INSTRUCTORFNAME} ${INSTRUCTORSNAME}`}</h4>
                    <div>at {create_date}</div>
                </div>

            </div>


        </section>
    )
}
