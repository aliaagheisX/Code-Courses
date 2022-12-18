import React from 'react'
import styles from './index.module.css'
import Comment from './Comment'
import AddComment from './AddComment'
import Resource from '../../../../Resource'
import api from '../../../../api'

export default function Comments({ id }) {
    return (
        <section className={styles.comment_sec}>
            <h5>Comments</h5>
            <AddComment />
            <Resource
                path={api.getArticlComments(id)}
                ErrorComp={<></>}
                render={({ items: { comments } }) => {
                    const MapComments = {}
                    for (const i in comments) {
                        MapComments[comments[i].ID] = comments[i]
                        MapComments[comments[i].ID].replies = []
                    }

                    for (const i in comments) {
                        const curr = comments[i].ID
                        const replied_on = comments[i].RID
                        if (replied_on !== null) MapComments[replied_on].replies.push(curr)
                    }

                    return (
                        <div className={styles.comment_list}>
                            {
                                comments.map((cmnt) => {
                                    if (cmnt.RID !== null) return;
                                    else return <Comment MapComments={MapComments} id={cmnt.ID} key={cmnt.ID} />
                                })
                            }
                        </div>
                    )
                }}
            />

        </section>
    )
}
