import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';

import styles from './styles/index.module.css'
import { Link } from 'react-router-dom';
import api from '../../api';
import useToken from '../../useToken';
export default function CourseContent({ lessons: lessonsInit, instructor_id }) {
    const [lessons, setLessons] = useState(lessonsInit);
    const { userdata, token } = useToken()

    const rmvLesson = (id) => {
        const temp = lessons.filter((i) => i.LID !== id);
        setLessons(temp)
    }
    const deleteLesson = async (id) => {
        try {
            const res = await fetch(api.deleteLesson(id), {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'token': token },
            });
            const data = await res.json();
            if (!res.ok)
                throw Error(data.message);
            console.log("succuss", data);
            rmvLesson(id);
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <section id='curriculum'>
            <h2 className={styles.heading}>Course content</h2>
            <div className={styles.container}>
                <ul className={styles.description}>
                    <li className={styles.sep}>{lessons.length} lessons</li>
                </ul>
            </div>


            <Accordion alwaysOpen>
                {
                    lessons.map(({ LID, NAME, AID, QID, article_title, quiz_title, DESCRIPTION }) => (
                        <Accordion.Item eventKey={LID} key={LID}>
                            <Accordion.Header>
                                <div className={styles.decLeft}>
                                    {NAME}
                                </div>
                                {instructor_id === userdata.ID &&
                                    <div className={styles.decRight}>
                                        <div className={`btnIconList ${styles.UserOptions}`}>
                                            <Link to={`/lessons/edit/${LID}`}>
                                                <div className='btnIcon success'>
                                                    <span className="material-symbols-outlined">
                                                        edit
                                                    </span>
                                                </div>
                                            </Link>
                                            <div className='btnIcon danger' onClick={() => deleteLesson(LID)}>
                                                <span className="material-symbols-outlined">
                                                    close
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                }

                            </Accordion.Header>

                            <Accordion.Body>
                                <div className={styles.section}>
                                    <div className={styles.row}>
                                        <div className={styles.cont}>
                                            {DESCRIPTION}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.section}>
                                    <div className={styles.row}>
                                        <div className={styles.cont}>
                                            <span className={`material-symbols-outlined ${styles.icon}`}>note</span>

                                            <Link className={styles.title} to={`/articles/${AID}`}>{article_title}</Link>

                                        </div>
                                    </div>
                                </div>

                                <div className={styles.section}>
                                    <div className={styles.row}>
                                        <div className={styles.cont}>
                                            <span className={`material-symbols-outlined ${styles.icon}`}>contact_support</span>

                                            <Link className={styles.title} to={`/quizzes/${QID}`}>{quiz_title}</Link>

                                        </div>
                                    </div>
                                </div>
                            </Accordion.Body>


                        </Accordion.Item>
                    ))
                }
            </Accordion>
        </section>
    )
}
