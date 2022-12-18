import React from 'react'
import ProfileCharts from './ProfileCharts'
import ProfileBar from './ProfileBar'

import styles from './index.module.css'

import Resource from '../../Resource'

import api from '../../api'

import { useParams } from 'react-router-dom'
import ArticleComponent from '../../components/ArticleComponent'

import Options from './Options'
export default function InstructorProfile() {

    let { id } = useParams();

    return (

        < Resource
            path={api.instructor(id)}
            render={({ items }) => {
                const { instructor, writtenCount } = items
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

                        <Resource
                            path={api.getInstructorArticles(id)}
                            ErrorComp={<></>}
                            render={({ items: { articles } }) => (
                                <section>
                                    <h3>Articles</h3>

                                    <div className='elementCont' >
                                        {

                                            articles.map((article) => <ArticleComponent article={article} key={article.ID} />)
                                        }
                                    </div>
                                </section>
                            )}
                        />
                        {/* <Articles articlesRead={items.articlesRead} articlesLiked={items.articlesLiked} /> */}
                    </section>
                )
            }} />


    )
}
