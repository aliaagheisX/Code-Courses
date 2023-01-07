import React from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.css'

export default function Logo() {
    return (
        <Link to={'/'}>
            <div className={styles.wrapper}>
                <img src={require('./logo.png')} alt='logo' />
                {/* <div className={styles.logo}>CODE Courses</div> */}
            </div>
        </Link>
    )
}
