import React from 'react'
import styles from './index.module.css'
import { NavLink } from 'react-router-dom'
export default function SideNav() {
    return (
        <aside className={styles.wrapper}>
            <ul>
                <li><NavLink to="/me">
                    <span className="material-symbols-outlined">
                        person
                    </span>
                    <span className={styles.overlay}>Profile</span>

                </NavLink></li>

                <li><NavLink to="/courses">
                    <span className="material-symbols-outlined">
                        play_arrow
                    </span>
                    <span className={styles.overlay}>Courses</span>

                </NavLink></li>

                <li><NavLink to="/lessons">
                    <span className="material-symbols-outlined">
                        play_lesson
                    </span>
                    <span className={styles.overlay}>Lessons</span>
                </NavLink></li>

                <li><NavLink to="/quizzes"><span className="material-symbols-outlined">
                    quiz
                </span>
                    <span className={styles.overlay}>Quizzes</span>
                </NavLink></li>

                <li><NavLink to="/questions">
                    <span className="material-symbols-outlined">
                        contact_support
                    </span>
                    <span className={styles.overlay}>Questions</span>
                </NavLink></li>

                <li><NavLink to="/articles">
                    <span className="material-symbols-outlined">feed</span>
                    <span className={styles.overlay}>Articles</span>
                </NavLink></li>

                <li><NavLink to="/discussions">
                    <span className="material-symbols-outlined">forum</span>
                    <span className={styles.overlay}>Discussions</span>
                </NavLink></li>

                <li><NavLink to="/edit/me">
                    <span className="material-symbols-outlined">settings</span>
                    <span className={styles.overlay}>Edit profile</span>
                </NavLink></li>
            </ul>
        </aside>
    )
}
