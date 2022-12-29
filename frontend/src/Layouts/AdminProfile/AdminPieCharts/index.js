import React from 'react'
import styles from './index.module.css'

import Circle from '../../../components/Circle'



export default function AdminPieCharts({ UsersReport, ActivitesReport }) {
    const { number_of_courses, number_of_article, number_of_quiz, number_of_lessons, number_of_question, number_of_comments, number_of_messages } = ActivitesReport;
    const { num_of_users, num_of_admins, num_of_instructors } = UsersReport;
    const data_users = [num_of_users, num_of_admins, num_of_instructors]
    const labels_users = [`users`, `admins`, `instructors`]
    const data_sub_activites = [number_of_lessons, number_of_question, number_of_comments, number_of_messages]
    const labels_sub_activites = [`lessons`, `questions`, `comments`, `messages`]
    const data_activites = [number_of_courses, number_of_quiz, number_of_article]
    const labels_activites = [`Courses`, `Quizzes`, `Articles`]
    const backgroundColor = ['#424261', '#E59819', '#8FC93A', '#7996d0']
    return (
        <div className={styles.wrapper}>
            <Circle data={data_activites} labels={labels_activites} backgroundColor={backgroundColor} title='total activities' />;
            <Circle data={data_sub_activites} labels={labels_sub_activites} backgroundColor={backgroundColor} title='total subactivities' />;
            <Circle data={data_users} labels={labels_users} backgroundColor={backgroundColor} title='total users' />;
        </div>
    )
}
