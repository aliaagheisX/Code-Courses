import React from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'

import DeletMe from '../../components/Forms/DeletMe'
import useToken from '../../useToken'
import api from '../../api'

export default function Options() {
    const { isInstructor, token, setInstructor, userdata } = useToken()
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
    console.log(isInstructor)
    return (
        <div className={styles.optsCont}>
            {isInstructor ?
                <Link to={`/instructors/${userdata.ID}`} className='btnG'>as Insrtuctor</Link> :
                <button className='btnG' onClick={handelAddInstructor}>Be Insrtuctor</button>
            }
            <div>
                <Link to='/edit/me' className='btnE'>Edite</Link>

                <section className={styles.danger}>
                    <DeletMe />
                </section>
            </div>
        </div>
    )
}
