import React from 'react'
import styles from './index.module.css'

export default function Logo() {
    return (
        <div className={styles.wrapper}>
            {/* <img src='/logo.png' alt='logo' /> */}
            <div className={styles.logo}>CODE Courses</div>
        </div>
    )
}
