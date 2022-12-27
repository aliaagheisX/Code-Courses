import React from 'react'
import UserSummary from '../../../../components/UserSummary'
import styles from './index.module.css'
import { Stars } from '../StudentFeedBack/RatingDescription'
import getDate from '../../../../getDate'

export default function Review({ review }) {
    const {
        FNAME, SNAME, _IMAGE, STARTDATE, SID, REVIEWRATING, REVIEWBODY
    } = review

    return (
        <div className={styles.review}>
            <div className={styles.summary}>
                <UserSummary fname={FNAME} lname={SNAME} img={_IMAGE} id={SID} />
            </div>
            <div className={styles.strs}>
                <div className={styles.dte}>{getDate(STARTDATE)}</div>
                <Stars rating={REVIEWRATING} />
            </div>
            <div className={styles.body}>
                {REVIEWBODY}
            </div>
        </div>
    )
}
