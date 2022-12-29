import React, { useState } from 'react'
import styles from './index.module.css'
import api from '../../../../api'
import useToken from '../../../../useToken'
export default function Likes({ toggleReply, likes, id }) {
    const { token } = useToken()
    const [count, setCount] = useState(likes)
    const [isActive, setIsActive] = useState(0)
    const handelClick = async () => {
        try {

            const res = await fetch(api.likeComment(id), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'token': token },
            })
            const data = await res.json()

            if (!res.ok) throw Error(data.message)
            const newCount = data.likeCount;
            if (newCount < count) {
                setIsActive(0)
            }
            else {
                setIsActive(1)
            }
            setCount(newCount)

        } catch (err) {
            console.log("err", err)
        }}
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
