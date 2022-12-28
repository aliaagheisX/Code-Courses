import React from 'react'
import ProfileCharts from './ProfileCharts'
import ProfileBar from './ProfileBar'

import styles from './index.module.css'

import Resource from '../../Resource'

import api from '../../api'
import RankBar from './RankBar'

import { useParams } from 'react-router-dom'
import Articles from './Articles'
import Options from './Options'
import Courses from './Courses'
import CustomCarsoul from '../../components/CustomCarsoul'
import QuizComponent from '../../components/QuizComponent'

export default function AdminProfile() {

    let { id } = useParams();



    return (

        < Resource
            path={api.student(id)}
            render={({ items }) => {
                const { student } = items

                return (
                    <section className={styles.body} >
                        <Options id={student.ID} />
                        <main>
                            <ProfileBar userdata={student} />
                            <div className={styles.stats}>

                                <RankBar score={student.SCORE} />
                                <ProfileCharts
                                    nCourses={items.coursesCount}
                                    nArticles={items.readCount}
                                    nQuizzes={items.quizzesCount}
                                />

                            </div>
                        </main>


                        <Articles articlesRead={items.articlesRead} articlesLiked={items.articlesLiked} />
                        <Courses coursesEnrolled={items.coursesEnrolled} />
                        <section>
                            <h3>Quizzes</h3>
                            <CustomCarsoul
                                items={
                                    items.quizzesTaken.map((quiz) => <QuizComponent quiz={quiz} key={quiz.ID} />)

                                } />
                        </section>
                    </section>
                )
            }} />


    )
}
