import React from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'

import DeletMe from '../../components/Forms/DeletMe'
import useToken from '../../useToken'
import api from '../../api'

export default function Options() {
    const { isInstructor, userdata: { ID } } = useToken()

    return (
        <div className={styles.optsCont}>
            <div>
                <Link to={`/students/${ID}`} className='btnG'>as student</Link>

                {isInstructor ?
                    <Link to={`/instructors/${ID}`} className='btnG'>as Insrtuctor</Link> : <></>

                }
            </div>
        </div>
    )
}
