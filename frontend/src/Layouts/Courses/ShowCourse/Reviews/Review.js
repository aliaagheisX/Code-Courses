import React from 'react'
import UserSummary from '../../../../components/UserSummary'
import styles from './index.module.css'
import { Stars } from '../StudentFeedBack/RatingDescription'
export default function Review({ review }) {
    const {
        FNAME, SNAME, _IMAGE, STARTDATE, SID, REVIEWRATING, REVIEWBODY
    } = review
    const getDate = () => {
        const create_at = new Date(STARTDATE)
        const curr = new Date()
        const milli = Math.abs(curr - create_at)
        const secs = Math.floor(milli / 1000);
        const mins = Math.floor(secs / 60)
        const hrs = Math.floor(mins / 60)
        const days = Math.floor(hrs / 24)
        if (days > 0) return `${days} day${days > 1 ? 's' : ''}`
        if (hrs > 0) return `${hrs} hr${hrs > 1 ? 's' : ''}`
        if (mins > 0) return `${mins} min${mins > 1 ? 's' : ''}`
        return `${secs} sec${secs > 1 ? 's' : ''}`
    }
    return (
        <div className={styles.review}>
            <div className={styles.summary}>
                <UserSummary fname={FNAME} lname={SNAME} img={_IMAGE} id={SID} />
            </div>
            <div className={styles.strs}>
                <div className={styles.dte}>{getDate()}</div>
                <Stars rating={REVIEWRATING} />
            </div>
            <div className={styles.body}>
                {REVIEWBODY}
            </div>
        </div>
    )
}
