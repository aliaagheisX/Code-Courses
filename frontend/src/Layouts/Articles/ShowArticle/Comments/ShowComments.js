import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import Comment from './Comment'
import AddComment from './AddComment'

export default function ShowComments({ article_id, Initialcomments }) {

    const getGraphOfComments = (comments) => {
        const gp = {}
        for (const i in comments) {
            gp[comments[i].ID] = comments[i]
            gp[comments[i].ID].replies = []
        }

        for (const i in comments) {
            const curr = comments[i].ID
            const replied_on = comments[i].RID
            if (replied_on !== null) gp[replied_on].replies.push(curr)
        }
        return gp;
    }

    const [comments, setComments] = useState(getGraphOfComments(Initialcomments))

    const addComment = (new_comment) => {
        new_comment.replies = []

        const temp = { ...comments };
        temp[new_comment.ID] = new_comment
        const rid = new_comment.RID
        if (rid !== null) {
            temp[rid].replies.unshift(new_comment.ID)
        }
        else { window.scrollTo(0, document.body.scrollHeight); }
        setComments(temp)
        return comments
    }

    const removeComment = (id) => {
        const temp = { ...comments };
        const rid = temp[id].RID
        if (rid !== null) {
            const ind = temp[rid].replies.indexOf(id)
            temp[rid].replies.splice(ind, 1)
        }
        delete temp[id]
        setComments(temp)
        return temp
    }
    return (
        <>
            <AddComment reply_id={null} addComment={addComment} />

            <div className={styles.comment_list}>
                {
                    Object.keys(comments).map((comment_id) => {
                        if (comments[comment_id].RID !== null) return;

                        return <Comment comments={comments} id={comment_id} addComment={addComment} removeComment={removeComment} key={comment_id} />

                    })
                }
            </div>
        </>

    )
}
