import React, { useState } from 'react'
import AddComment from './AddComment'
import styles from './index.module.css'
import Likes from './Likes'
import Summary from './Summary'
export default function Comment({ comments, id, addComment }) {
    const [replies, setReplies] = useState(comments[id].replies)
    const addReply = (comment) => {
        const temp = addComment(comment)
        setReplies(temp[id].replies)
    }
    const [reply, setReply] = useState(0)
    const toggleReply = () => {
        setReply(!reply);
    }
    console.log()
    return (
        <div className={styles.comment}>
            <div className={styles.mainComment}>
                <Summary comment={comments[id]} />
                <div className={styles.body}>{comments[id].BODY}</div>
                <Likes toggleReply={toggleReply} likes={comments[id].likes} />
            </div>
            {!reply ? <></> : <AddComment addComment={addReply} reply_id={id} />}

            {
                replies.length === 0 ? <></> :
                    <div className={styles.comment_list}>
                        {
                            replies.map((id) => <Comment addComment={addComment} comments={comments} id={id} key={id} />)
                        }
                    </div>
            }

        </div>
    )
}
