import React, { useState } from 'react'
import styles from './index.module.css'
export default function Likes({ likes }) {
    const [active, setActive] = useState(0)
    const [count, setCount] = useState(likes)
    return (
        <div
            className={`${styles.stLike}  ${active ? styles.liActive : ''}`}
            onClick={() => {
                if (active)
                    setCount(likes);
                else
                    setCount(likes + 1)
                setActive(!active);
            }}
        >
            <span className={styles.lkCont}>
                <span className={styles.stl}>{count} </span>
                <span className="material-symbols-outlined">
                    favorite
                </span>
            </span>
        </div>
    )
}
