import React from 'react'
import styles from './index.module.css'

import Circle from '../../../components/Circle'



export default function ProfileCharts({ nCourses, nQuizzes, nArticles }) {
    const data = [nCourses, nQuizzes, nArticles]
    const labels = [`Courses`, `Quizzes`, `Articles`]
    const backgroundColor = ['#424261', '#E59819', '#8FC93A']
    return (
        <div className={styles.wrapper}>
            <Circle data={data} labels={labels} backgroundColor={backgroundColor} title='total activities' />;
        </div>
    )
}
