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
import RankDetails from '../../RankDetails'

export default function StudentProfile() {

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
                                    nQuizzes={3}
                                />

                            </div>
                        </main>


                        <Articles articlesRead={items.articlesRead} articlesLiked={items.articlesLiked} />
                        <Courses coursesEnrolled={items.coursesEnrolled} />
                    </section>
                )
            }} />


    )
}
