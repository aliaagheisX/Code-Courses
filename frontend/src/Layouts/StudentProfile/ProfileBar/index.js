import React from 'react'
import styles from './index.module.css'

import useToken from '../../../useToken'
import Avatar from '../../../components/Avatar'
import RankDetails
    from '../../../RankDetails'
export default function ProfileBar({ userdata }) {



    const {
        FNAME: first_name,
        SNAME: last_name,
        ABOUT: bio,
        SCORE: score,
        _IMAGE: img
    } = userdata
    const { rank, background } = RankDetails(score);


    return (
        <div className={styles.wrapper} style={{ background: background }}>
            <div className={styles.user}>
                <Avatar avatar={img} />
                <div className={styles.userDetails}>
                    <h2> {first_name} {last_name}</h2>
                    <div className={styles.bio}>{bio}</div>
                    <div className={styles.score}>{score}p</div>
                </div>
            </div>
            <div className={styles.rank}>{rank}</div>
        </div>
    )
}
