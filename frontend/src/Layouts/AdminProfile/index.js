import React from 'react'
import AdminPieCharts from './AdminPieCharts'
import ProfileBar from './ProfileBar'

import styles from './index.module.css'

import Resource from '../../Resource'

import api from '../../api'

import Options from './Options'
import CustomCarsoul from '../../components/CustomCarsoul'
import QuizComponent from '../../components/QuizComponent'
import ArticleComponent from '../../components/ArticleComponent'

import CourseComponent from '../../components/CourseComponent'
import TopicsChart from './TopicsChart'
export default function AdminProfile() {




    return (

        <Resource
            path={api.getAdminReport}
            render={({ items: { report } }) => {
                const { TopEnrolledCourses, TopLikedArticles, TopRatedCourses, TopTakenQuizzes, TopicsReport, UsersReport, ActivitesReport } = report;
                return (
                    <section className={styles.body} >
                        <Options />
                        <main>
                            <ProfileBar />
                            <div className={styles.stats}>
                                <AdminPieCharts UsersReport={UsersReport} ActivitesReport={ActivitesReport} />
                                <TopicsChart TopicsReport={TopicsReport} />

                            </div>
                        </main>

                        <section>
                            <h3>Top {TopLikedArticles.length} Liked Articles</h3>
                            <CustomCarsoul
                                items={
                                    TopLikedArticles.map((article) => <ArticleComponent article={article} key={article.ID} />)

                                } />
                        </section>

                        <section>
                            <h3>Top {TopRatedCourses.length} Rated Courses</h3>
                            <CustomCarsoul
                                items={
                                    TopRatedCourses.map((course) => <CourseComponent course={course} key={course.ID} />)

                                } />
                        </section>

                        <section>
                            <h3>Top {TopEnrolledCourses.length} Enrolled Courses</h3>
                            <CustomCarsoul
                                items={
                                    TopEnrolledCourses.map((course) => <CourseComponent course={course} key={course.ID} />)

                                } />
                        </section>

                        <section>
                            <h3>Top {TopTakenQuizzes.length} Taken Quizzes</h3>
                            <CustomCarsoul
                                items={
                                    TopTakenQuizzes.map((quiz) => <QuizComponent quiz={quiz} key={quiz.ID} />)

                                } />
                        </section>

                    </section>
                )
            }} />


    )
}
