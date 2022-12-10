import React from 'react'
import styles from './error.module.css'
import { Link } from 'react-router-dom'
export default function Error() {
    return (
        <section className={styles.cont}>
            <img src='/404.png' alt='404' />
            <Link to='/'>
                <button>return to Home</button>
            </Link>
        </section>
    )
}
