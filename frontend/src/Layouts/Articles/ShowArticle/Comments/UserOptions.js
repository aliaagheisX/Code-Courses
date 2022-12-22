import React from 'react'
import api from '../../../../api'
import useToken from '../../../../useToken'
import styles from './index.module.css'

export default function UserOptions({ toggleEditing, id, removeComment }) {
    const { token } = useToken()
    const deleteComment = async () => {
        try {
            const res = await fetch(api.deleteComment(id), {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'token': token },
            })
            const data = await res.json()

            if (!res.ok) throw data.message;
            removeComment(id)

        } catch (err) {
            console.log("err", err)
        }
    }
    return (

        <div className={`btnIconList ${styles.UserOptions}`}>
            <div className='btnIcon success' onClick={toggleEditing}>
                <span className="material-symbols-outlined">
                    edit
                </span>
            </div>
            <div className='btnIcon danger' onClick={deleteComment}>
                <span className="material-symbols-outlined">
                    close
                </span>
            </div>
        </div>
    )
}
