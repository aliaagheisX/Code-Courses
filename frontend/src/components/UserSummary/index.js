import React from 'react'
import Avatar from '../Avatar'

import styles from './index.module.css'

export default function UserSummary({ fname, lname, img, email }) {
    return (
        <div className={styles.cont}>
            <Avatar avatar={img} />
            <div className={styles.det}>
                <span className={styles.name}>{fname} {lname}</span>
                <span className={styles.email}>{email}</span>
            </div>
        </div>
    )
}
