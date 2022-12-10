import React from 'react'
import ProfileCharts from './ProfileCharts'
import ProfileBar from './ProfileBar'

import styles from './index.module.css'
import useToken from '../../useToken'
import Resource from '../../Resource'

import api from '../../api'
import RankBar from './RankBar'

import { useParams } from 'react-router-dom'

export default function StudentProfile() {
    let { id } = useParams();
    const ranks = ['Newbie', 'Pupil', 'Specialist', 'Expert', 'CM', 'IM', 'GM', 'IGM', 'LGM'];
    const min_scores_per_rank = [0, 1200, 1400, 1600, 1900, 2100, 2300, 2400, 2600, 3000]
    const getRatingByScore = (score) => {
        for (let i = 0; i < min_scores_per_rank.length; i++) {
            if (min_scores_per_rank[i] > score) {
                return i - 1;
            }
        }
        return 9;//max rating
    }
    const getPercentileOfNxtRating = (score) => {
        const currRank = getRatingByScore(score);
        if (currRank === 9) return 100;

        const nxtRankScore = min_scores_per_rank[currRank + 1];

        return [(nxtRankScore - score), (score / nxtRankScore * 100)];

    }

    return (
        <Resource
            path={api.user(id)}
            render={({ items: { user } }) => (

                < Resource
                    path={api.student(id)}
                    render={({ items: { student } }) => {

                        student.NUMBEROFENROLLEDCOURSES = 3
                        student.NUMBEROFREADARTICLES = 3
                        student.NUMBEROFSOLVEDQUIZZES = 3

                        const rank_ind = getRatingByScore(student.SCORE)
                        const rank = ranks[rank_ind]
                        const [rem, percent] = getPercentileOfNxtRating(student.SCORE)
                        const nxtRank = rank === 9 ? 'Greatness' : ranks[rank_ind + 1];

                        return (
                            <section className={styles.body} >

                                <main>
                                    <ProfileBar userdata={user} score={student.SCORE} rank_ind={rank_ind} rank={rank} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 50px' }}>

                                        <RankBar percent={percent} nxtRank={nxtRank} remenderPts={rem} />
                                        <ProfileCharts
                                            nCourses={student.NUMBEROFENROLLEDCOURSES}
                                            nArticles={student.NUMBEROFREADARTICLES}
                                            nQuizzes={student.NUMBEROFSOLVEDQUIZZES}
                                        />

                                    </div>
                                </main>
                            </section>
                        )
                    }} />
            )
            } />

    )
}
