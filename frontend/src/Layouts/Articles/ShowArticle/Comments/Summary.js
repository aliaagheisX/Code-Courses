import React from 'react'
import UserSummary from '../../../../components/UserSummary'
import styles from './index.module.css'
import getDate from '../../../../getDate'
export default function Summary({ comment }) {
    const {
        FNAME, SNAME, _IMAGE, CREATIONDATENTIME, UID
    } = comment

    return (
        <div className={styles.summary}>

            <UserSummary fname={FNAME} lname={SNAME} img={_IMAGE} email={getDate(CREATIONDATENTIME)} id={UID} />
        </div>
    )
}
