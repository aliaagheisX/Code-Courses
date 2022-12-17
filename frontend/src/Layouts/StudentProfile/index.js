import React, { useState } from 'react'
import ProfileCharts from './ProfileCharts'
import ProfileBar from './ProfileBar'

import styles from './index.module.css'

import Resource from '../../Resource'

import api from '../../api'
import RankBar from './RankBar'

import { useParams } from 'react-router-dom'
import Articles from './Articles'
import Options from './Options'


export const ranks = ['Newbie', 'Pupil', 'Specialist', 'Expert', 'CM', 'IM', 'GM', 'IGM', 'LGM'];
export const min_scores_per_rank = [0, 1200, 1400, 1600, 1900, 2100, 2300, 2400, 2600, 3000]

export default function StudentProfile() {

    let { id } = useParams();
    const getRatingByScore = (score) => {
        for (let i = 0; i < min_scores_per_rank.length; i++) {
            if (min_scores_per_rank[i] > score) {
                return i - 1;
            }
        }
        return 8;//max rating
    }
    const getPercentileOfNxtRating = (score) => {

        const currRank = getRatingByScore(score);
        let nxtRankScore = 0;
        let befRankScore = 0;
        if (score >= 3000) {
            nxtRankScore = (Math.floor(score / 1000) + 1) * 1000;
            befRankScore = nxtRankScore - 1000;
        }
        else {
            nxtRankScore = min_scores_per_rank[currRank + 1];
            befRankScore = min_scores_per_rank[currRank];
        }

        return [(nxtRankScore - score), ((score - befRankScore) / (nxtRankScore - befRankScore) * 100)];


    }


    return (

        < Resource
            path={api.student(id)}
            render={({ items }) => {
                const { student } = items
                const rank_ind = getRatingByScore(student.SCORE)
                const rank = ranks[rank_ind]
                const [rem, percent] = getPercentileOfNxtRating(student.SCORE)
                const nxtRank = rank_ind === 8 ? 'Thousands' : ranks[rank_ind + 1];
                return (
                    <section className={styles.body} >
                        <Options />
                        <main>
                            <ProfileBar userdata={student} rank_ind={rank_ind} rank={rank} />
                            <div className={styles.stats}>

                                <RankBar percent={percent} nxtRank={nxtRank} remenderPts={rem} />
                                <ProfileCharts
                                    nCourses={3}
                                    nArticles={items.readCount}
                                    nQuizzes={3}
                                />

                            </div>
                        </main>

                        <Articles articlesRead={items.articlesRead} articlesLiked={items.articlesLiked} />
                    </section>
                )
            }} />


    )
}
