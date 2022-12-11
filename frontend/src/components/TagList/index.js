import React from 'react'
import Tags from '../Tags'
import styles from './index.module.css'
export default function TagList({ items }) {
    return (
        <div className={styles.cont}>
            {
                Object.keys(items).map((key) =>

                    < Tags key={key} value={key} isActive={items[key][0]} to={items[key][1]} />
                )
            }
        </div>
    )
}
