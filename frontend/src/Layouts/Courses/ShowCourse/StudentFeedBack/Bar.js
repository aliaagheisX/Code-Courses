import React from 'react'
import styles from './styles/Bar.module.css'

export default function Bar({ precentage }) {
    return (
        <div className={styles.mainBar}>
            <div
                className={styles.above}
                style={{
                    width: `${precentage}%`
                }}

            >

            </div>
        </div>
    )
}
