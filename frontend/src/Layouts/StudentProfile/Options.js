import React from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'

import DeletMe from '../../components/Forms/DeletMe'
import useToken from '../../useToken'
import api from '../../api'

export default function Options({ id }) {
    const { isInstructor, isAdmin, token, setInstructor, userdata: { ID } } = useToken()
    const handelAddInstructor = async () => {
        try {
            const res = await fetch(api.addInstructor, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'token': token },
            })
            const data = await res.json()

            if (!res.ok) throw data.message
            console.log("succuss", data)
            setInstructor(1)


        } catch (err) {
            console.log("err", err)
        }

    }
    return (
        <div className={styles.optsCont}>
            <div>
                {isInstructor ?
                    <Link to={`/instructors/${id}`} className='btnG'>as Insrtuctor</Link> :
                    ID === id &&
                    <button className='btnG' onClick={handelAddInstructor}>Be Insrtuctor</button>
                }
                {isAdmin && (ID === id) ?
                    <Link to={`/admin`} className='btnG'>as admin</Link> : <></>
                }
            </div>

            <div>
                {token && (isAdmin || ID === id) ?
                    <>
                        <Link to='/edit/me' className='btnE'>Edit</Link>

                        <section className={styles.danger}>
                            <DeletMe />
                        </section>
                    </> : <></>}
            </div>
        </div>
    )
}
