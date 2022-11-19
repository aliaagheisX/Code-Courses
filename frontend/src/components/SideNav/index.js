import React from 'react'
import styles from './index.module.css'
export default function SideNav() {
    return (
        <aside className={styles.wrapper}>
            <h3>Menu</h3>
            <ul>
                <li><a href="/courses">Courses</a></li>
                <li><a href="/lessons">Lessons</a></li>
                <li><a href="/quizzes">Quizzes</a></li>
                <li><a href="/questions">Questions</a></li>
                <li><a href="/articles">Articles</a></li>
                <li><a href="/discussions">Discussions</a></li>
            </ul>
        </aside>
    )
}
