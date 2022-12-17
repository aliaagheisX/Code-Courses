import React from 'react'
import Avatar from '../Avatar'

import styles from './index.module.css'
import { Link } from 'react-router-dom'
export default function UserSummary({ fname, lname, img, email, id }) {
    return (
        <div className={styles.cont}>
            <Avatar avatar={img} />
            <div className={styles.det}>
                <Link to={`/students/${id}`}><span className={styles.name}>{fname} {lname}</span></Link>
                <span className={styles.email}>{email}</span>
            </div>
        </div>
    )
}
