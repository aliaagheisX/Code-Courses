import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './index.module.css'
import DeleteAll from '../../../DeleteAll'
import api from '../../../api'
import useToken from '../../../useToken'

export default function Options({ id, instructor_id, score }) {
    const { token, userdata, isAdmin, isInstructor } = useToken()

    return (
        <div className={styles.Buttons}>

            {
                (token && userdata.ID !== instructor_id) && (
                    <Link to='take' className='btnG'>{score ? 'Retake quiz' : 'Take quiz'}</Link>
                )
            }
            {
                (token && (isAdmin || (isInstructor && userdata.ID === instructor_id))) &&
                <div className={styles.opt} >
                    <Link to={`/quizzes/edit/${id}`} className='btnE'>Edit</Link>
                    <DeleteAll
                        txt='Delete'
                        path={api.deleteCourse(id)}
                        isNavigate={1}
                        where={'/quizzes'}
                        afterDelete={() => { }}
                    />

                </div>
            }

        </div>
    )

}
