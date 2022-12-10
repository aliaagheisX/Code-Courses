import React from 'react'
import styles from './rankbar.module.css'
export default function RankBar({ percent, nxtRank, remenderPts }) {

    return (
        <div className={styles.cont}>
            <img src='/run.png' alt='runner' style={{ marginLeft: `calc(${percent}% - 90px)` }} />
            <div className={styles.totalP}>
                <div className={styles.partP} style={{ width: `calc(${percent}%)` }}></div>
            </div>
            <div className={styles.txt}>
                {remenderPts} points to <span> {nxtRank} </span>
            </div>

        </div>
    )
}
