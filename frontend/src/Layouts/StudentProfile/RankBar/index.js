import React from 'react'
import styles from './rankbar.module.css'
import RankDetails from '../../../RankDetails';
export default function RankBar({ score }) {
    const {
        rem, percent, nxtRank
    } = RankDetails(score);
    return (
        <div className={styles.cont}>
            <img src={require('./run.png')} alt='runner' style={{ marginLeft: `calc(${percent}% - 90px)` }} />
            <div className={styles.totalP}>
                <div className={styles.partP} style={{ width: `calc(${percent}%)` }}></div>
            </div>
            <div className={styles.txt}>
                {rem} points to <span> {nxtRank} </span>
            </div>

        </div>
    )
}
