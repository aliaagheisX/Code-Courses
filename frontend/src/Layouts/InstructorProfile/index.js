import React from 'react'
import ProfileCharts from './ProfileCharts'
import ProfileBar from './ProfileBar'

import styles from './index.module.css'

import Resource from '../../Resource'

import api from '../../api'

import { useParams } from 'react-router-dom'
import ArticleComponent from '../../components/ArticleComponent'

import Options from './Options'
import CustomCarsoul from '../../components/CustomCarsoul'
import CourseComponent from '../../components/CourseComponent'
import QuizComponent from '../../components/QuizComponent'
export default function InstructorProfile() {

    let { id } = useParams();

    return (

        < Resource
            path={api.instructor(id)}
            render={({ items }) => {
                const {
                    instructor,
                    writtenCount,
                    writtenArticles: articles,
                    courses,
                    coursesCount,
                    quizzesCount,
                    quizzes
                } = items
                return (
                    <section className={styles.body} >
                        <Options id={instructor.ID} />
                        <main>
                            <ProfileBar userdata={instructor} />
                            <div className={styles.stats}>

                                <ProfileCharts
                                    nCourses={coursesCount}
                                    nArticles={writtenCount}
                                    nQuizzes={quizzesCount}
                                />

                            </div>
                        </main>

                        <section>
                            <h3>Articles</h3>
                            <CustomCarsoul
                                items={
                                    articles.map((article) => <ArticleComponent article={article} key={article.ID} />)

                                } />
                        </section>

                        <section>
                            <h3>Courses</h3>
                            <CustomCarsoul
                                items={
                                    courses.map((course) => <CourseComponent course={course} key={course.ID} />)

                                } />
                        </section>

                        <section>
                            <h3>Quizzes</h3>
                            <CustomCarsoul
                                items={
                                    quizzes.map((quiz) => <QuizComponent quiz={quiz} key={quiz.ID} />)

                                } />
                        </section>

                    </section>
                )
            }} />


    )
}
