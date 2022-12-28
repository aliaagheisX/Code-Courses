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
        _IMAGE: img
    } = userdata


    return (
        <div className={styles.wrapper} style={{ background: 'linear-gradient(90deg, #200122 63.54%, #6F0000 98.96%)' }}>
            <div className={styles.user}>
                <Avatar avatar={img} />
                <div className={styles.userDetails}>
                    <h2> {first_name} {last_name}</h2>
                    <div className={styles.bio}>{bio}</div>
                </div>
            </div>
            <div className={styles.rank}>Admin</div>
        </div>
    )
}
