import React from 'react'
import styles from './index.module.css'
import useToken from '../../useToken'
import { NavLink } from 'react-router-dom'
import AdminProtectedComponent from '../AdminProtectedComponent'
import InstructorProtectedComponent from '../InstructorProtectedComponent'
export default function SideNav() {
    const { token } = useToken()
    return (
        <aside className={styles.wrapper}>
            <ul>
                <li><NavLink to={`/users`}>
                    <span className="material-symbols-outlined">
                        person
                    </span>
                    <span className={styles.overlay}>Users</span>

                </NavLink></li>

                <AdminProtectedComponent
                    render={
                        <li><NavLink to={`/topics`}>
                            <span className="material-symbols-outlined">
                                category
                            </span>
                            <span className={styles.overlay}>Topics</span>
                        </NavLink></li>
                    }
                    replace={<></>}
                />


                <li><NavLink to="/articles">
                    <span className="material-symbols-outlined">feed</span>
                    <span className={styles.overlay}>Articles</span>
                </NavLink></li>

                <li><NavLink to="/courses">
                    <span className="material-symbols-outlined">
                        play_lesson
                    </span>
                    <span className={styles.overlay}>Courses</span>

                </NavLink></li>



                <li><NavLink to="/quizzes"><span className="material-symbols-outlined">
                    quiz
                </span>
                    <span className={styles.overlay}>Quizzes</span>
                </NavLink></li>

                <InstructorProtectedComponent
                    render={
                        <li><NavLink to="/questions">
                            <span className="material-symbols-outlined">
                                contact_support
                            </span>
                            <span className={styles.overlay}>Questions</span>
                        </NavLink></li>
                    }
                    replace={<></>} />



                {token ?
                    <li><NavLink to="/edit/me">
                        <span className="material-symbols-outlined">settings</span>
                        <span className={styles.overlay}>Edit profile</span>
                    </NavLink></li> :
                    <></>
                }
            </ul>
        </aside>
    )
}
