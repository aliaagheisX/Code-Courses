import React from 'react'
import styles from './index.module.css'

import useToken from '../../useToken'

export default function Profile() {
    const { userdata: { username, firstName, lastName, bio, rank, avatar } } = useToken()

    return (
        <div className={styles.wrapper}>
            <div className={styles.user}>
                <img src={avatar ? avatar : '/36..04.jpg'} width='70px' className={styles.avatar} alt='avatar' />
                <div className={styles.userDetails}>
                    <h2>Welcome {firstName} {lastName}</h2>
                    <div className={styles.bio}>web developer is just an ease !!</div>
                    <div className={styles.score}>1280p</div>
                </div>
            </div>
            <div className={styles.rank}>Pubil</div>
        </div>
    )
}
