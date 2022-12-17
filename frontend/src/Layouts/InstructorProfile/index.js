import React from 'react'
import ProfileCharts from './ProfileCharts'
import ProfileBar from './ProfileBar'

import styles from './index.module.css'

import Resource from '../../Resource'

import api from '../../api'

import { useParams } from 'react-router-dom'
import Articles from './Articles'
import Options from './Options'
export default function StudentProfile() {

    let { id } = useParams();

    return (

        < Resource
            path={api.instructor(id)}
            render={({ items }) => {
                const { instructor, writtenCount } = items
                console.log(items)
                return (
                    <section className={styles.body} >
                        <Options />
                        <main>
                            <ProfileBar userdata={instructor} />
                            <div className={styles.stats}>

                                <ProfileCharts
                                    nCourses={3}
                                    nArticles={writtenCount}
                                    nQuizzes={3}
                                />

                            </div>
                        </main>

                        {/* <Articles articlesRead={items.articlesRead} articlesLiked={items.articlesLiked} /> */}
                    </section>
                )
            }} />


    )
}
