import React from 'react'
import styles from './index.module.css'
import { Link, useNavigate } from 'react-router-dom'

import useToken from '../../useToken'
import api from '../../api'

export default function Options({ id }) {
    const { userdata, token, setInstructor, isAdmin } = useToken()
    const navigate = useNavigate();

    const handelDeleteIns = async () => {
        try {
            const res = await fetch(api.deleteInstructor(userdata.ID), {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'token': token }
            })
            const data = await res.json()
            if (!res.ok) throw data.message
            setInstructor(0)
            navigate(`/students/${userdata.ID}`)
        }
        catch (err) {
            console.log("error", err)
        }

    }
    return (
        <div className={styles.optsCont}>
            <Link to={`/students/${id}`} className='btnG'>as Student</Link> :

            <div>
                {token && (isAdmin || userdata.ID === id) ?
                    <>
                        <Link to='/edit/me' className='btnE'>Edite</Link>
                        <button className='btnDanger' onClick={handelDeleteIns}>Delete Instructor</button>

                    </> : <></>}
            </div>
        </div>
    )
}
