import React from 'react'
import styles from './index.module.css'

import useToken from '../../../useToken'
import Avatar from '../../../components/Avatar'
import RankDetails from '../../../RankDetails'

export default function ProfileBar({ userdata }) {


    const bg_styles = [
        'linear-gradient(90deg, #2C3E50 34.9%, #BDC3C7 98.96%)',
        'linear-gradient(90deg, #11998E 63.54%, #38EF7D 98.96%)',
        'linear-gradient(90deg, #514A9D 52.6%, #24C6DC 98.96%)',
        'linear-gradient(90deg, #1A2980 46.88%, #26D0CE 100%)',
        'linear-gradient(90deg, #493240 50.6%, #FF0099 98.96%)',
        'linear-gradient(90deg, #799F0C 0%, #00416A 100%)',
        'linear-gradient(90deg, #F5AF19 63.54%, #F12711 98.96%)',
        'linear-gradient(90deg, #C31432 63.54%, #240B36 100%)',
        'linear-gradient(90deg, #3C1053 63.54%, #AD5389 98.96%)',
        'linear-gradient(90deg, #200122 63.54%, #6F0000 98.96%)',
        'linear-gradient(90deg, #200122 63.54%, #6F0000 98.96%)'
    ]
    const {
        FNAME: first_name,
        SNAME: last_name,
        ABOUT: bio,
        RATING,
        _IMAGE: img
    } = userdata

    const { background } = RankDetails(RATING)

    return (
        <div className={styles.wrapper} style={{ background: background }}>
            <div className={styles.user}>
                <Avatar avatar={img} />
                <div className={styles.userDetails}>
                    <h2> {first_name} {last_name}</h2>
                    <div className={styles.bio}>{bio}</div>
                </div>
            </div>
            <div className={styles.rank}>{RATING}</div>

        </div>
    )
}
