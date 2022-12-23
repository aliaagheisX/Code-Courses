import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './index.module.css'
import DeleteAll from '../../../DeleteAll'
import api from '../../../api'
import useToken from '../../../useToken'

export default function Options({ id, instructor_id }) {
    const { token, userdata, isAdmin, isInstructor } = useToken()
    if (token && (isAdmin || (isInstructor && userdata.ID === instructor_id))) {

        return (
            <div className={styles.Buttons}>
            <button className='btnG'>Enroll</button>
        < div className={styles.opt} >
            <Link to={`/courses/edite/${id}`} className='btnE'>Edite</Link>
            <DeleteAll
                txt='Delete'
                path={api.deleteCourse(id)}
                isNavigate={1}
                where={'/courses'}
                afterDelete={() => { }}
            />
            
        </div >
            </div>
            )
    }
    else return <></>

}
