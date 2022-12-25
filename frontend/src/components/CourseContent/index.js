import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

import styles from './styles/index.module.css'
import { Link } from 'react-router-dom';
export default function CourseContent({ lessons }) {
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
                    lessons.map(({ LID, NAME, AID, QID, article_title, quiz_title }) => (
                        <Accordion.Item eventKey={LID} key={LID}>
                            <Accordion.Header>
                                <div className={styles.decLeft}>
                                    {NAME}
                                </div>
                            </Accordion.Header>

                            <Accordion.Body>
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

                                            <Link className={styles.title} to={`/articles/${QID}`}>{quiz_title}</Link>

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
