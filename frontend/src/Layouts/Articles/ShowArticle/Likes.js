import React, { useState } from 'react'
import api from '../../../api'
import useToken from '../../../useToken'
import styles from './index.module.css'

export default function Likes({ likes, views, a_id }) {
    const { token } = useToken()
    const [active, setActive] = useState(0)
    const [count, setCount] = useState(likes)

    const handelLike = async () => {
        if (!token) return;
        try {
            const res = await fetch(api.userLikeArticle(a_id), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'token': token },
            })
            const data = await res.json()
            if (!res.ok) throw data.message
            console.log(data.message, (data.message === 'Student liked article'))

            setActive((data.message === 'Student liked article'));
            setCount(data.likeCount)
        } catch (err) {
            console.log("err", err)
        }
    }
    return (
        <div
            className={styles.stLike}>
            <span className={`${styles.lkCont} ${active ? styles.liActive : ''}`}

                onClick={handelLike}>
                <span className={styles.stl}>{count}  </span>
                <span className="material-symbols-outlined">
                    favorite
                </span>
            </span>


            <span className={`${styles.vsCont}`}>
                <span className={styles.stl}>{views} </span>
                <span className="material-symbols-outlined">
                    visibility
                </span>
            </span>
        </div>
    )
}
