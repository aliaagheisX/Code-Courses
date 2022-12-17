import React from 'react'
import styles from './index.module.css'

export default function Comments() {
    return (
        <section className={styles.comment_sec}>
            <h5>Comments</h5>
            <div className={styles.comment_list}>
                <div className={styles.comment}>
                    <div className={styles.mainComment}>
                        <div className={styles.usersummary}>
                            <img src='/15-08.jpg' alt='avatar' />
                            <div>
                                <h6>Aliaa Gheis</h6>
                                <span>@aliaagheis</span>
                            </div>
                            <div>2 days ago</div>
                        </div>
                        <div className={styles.body}>good point of view</div>
                        <span className="material-symbols-outlined">
                            thumb_up
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}
