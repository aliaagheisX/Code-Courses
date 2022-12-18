import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './index.module.css'
import DeleteAll from '../../../DeleteAll'
import api from '../../../api'
import useToken from '../../../useToken'

export default function Options({ id, instructor_id }) {
    const navigate = useNavigate()
    const { token, userdata, isAdmin, isInstructor } = useToken()
    console.log(isAdmin || (isInstructor && userdata.ID === instructor_id))

    if (token && (isAdmin || (isInstructor && userdata.ID === instructor_id))) {

        return (< div className={styles.opt} >
            <Link to={`/articles/edite/${id}`} className='btnE'>Edite</Link>
            <DeleteAll
                txt='Delete'
                path={api.deleteArticle(id)}
                isNavigate={1}
                where={'/articles'}
                afterDelete={() => { }}
            />
        </div >)
    }
    else return <></>

}
