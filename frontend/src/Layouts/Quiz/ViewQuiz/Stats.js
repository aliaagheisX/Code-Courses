import React from 'react'
import styles from './index.module.css'

export default function Stats({ numOfStudents, numOfQuestions }) {
    return (
        <div className={styles.stLike}>
            <span className={styles.vsCont}>
                <span className={styles.stl}>{numOfStudents}  </span>
                <span className="material-symbols-outlined">
                    group
                </span>
            </span>


            <span className={styles.vsCont}>
                <span className={styles.stl}>{numOfQuestions} </span>
                <span className="material-symbols-outlined">
                    question_mark
                </span>
            </span>
        </div>
    )
}
