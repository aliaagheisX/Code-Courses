import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './index.module.css'
import DeleteAll from '../../../DeleteAll'
import api from '../../../api'
import useToken from '../../../useToken'

export default function Options({ id, instructor_id, score, showQuiz, setShowQuiz }) {
    const { token, userdata, isAdmin, isInstructor } = useToken()

    return (
        <div className={styles.Buttons}>

            {
                (token && userdata.ID !== instructor_id && !showQuiz) && (
                    <button
                        onClick={() => setShowQuiz(1)}
                        className='btnG'>
                        {score ? 'Retake quiz' : 'Take quiz'}
                    </button>
                )
            }
            {
                /* (token && (isAdmin || (isInstructor && userdata.ID === instructor_id))) &&
                <div className={styles.opt} >
                    <Link to={`/quizzes/edit/${id}`} className='btnE'>Edit</Link>
                    <DeleteAll
                        txt='Delete'
                        path={api.deleteCourse(id)}
                        isNavigate={1}
                        where={'/quizzes'}
                        afterDelete={() => { }}
                    />

                </div> */
            }

        </div>
    )

}
