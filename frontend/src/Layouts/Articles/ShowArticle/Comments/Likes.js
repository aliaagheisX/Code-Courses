import React, { useState } from 'react'
import styles from './index.module.css'
export default function Likes({ toggleReply }) {
    const [count, setCount] = useState(5)
    const [isActive, setIsActive] = useState(0)
    const handelClick = () => {
        if (isActive) {
            setIsActive(0)
            setCount(count - 1)
        }
        else {
            setIsActive(1)
            setCount(count + 1)

        }
    }

    return (
        <div className={styles.options}>
            <div className={`${styles.likes} ${isActive ? styles.active : ''}`}
                onClick={handelClick}>
                <span className="material-symbols-outlined">
                    thumb_up
                </span>
                {count}
            </div>
            <div className={styles.reply} onClick={() => toggleReply()}>
                <span className="material-symbols-outlined">
                    reply
                </span>
                reply
            </div>
        </div>
    )
}
