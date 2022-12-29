import React, { useState } from 'react'
import useToken from '../../../../useToken'
import AddComment from './AddComment'
import EditeComment from './EditeComment'
import styles from './index.module.css'
import Likes from './Likes'
import Summary from './Summary'
import UserOptions from './UserOptions'
export default function Comment({ comments, id, addComment, removeComment }) {
    const { token, userdata } = useToken()
    const [isEditing, setIsEditing] = useState(0)
    const [body, setBody] = useState(comments[id].BODY)
    const toggleEditing = () => {
        setIsEditing(!isEditing)
    }
    const handelEditingBody = (value) => {
        debugger;
        setBody(value)
        toggleEditing()
    }
    const [replies, setReplies] = useState(comments[id].replies)
    const addReply = (comment) => {
        const temp = addComment(comment)
        setReplies(temp[id].replies)
    }
    const [reply, setReply] = useState(0)
    const toggleReply = () => {
        setReply(!reply);
    }

    const removeReply = (id) => {
        const temp = removeComment(id)
        setReplies(temp[id].replies)
    }
    return (
        <div className={styles.comment}>
            <div className={styles.mainComment}>
                <div className={styles.optHeader}>
                    <Summary comment={comments[id]} />
                    {token && userdata.ID == comments[id].UID &&
                        <UserOptions id={id} toggleEditing={toggleEditing} removeComment={removeComment} />
                    }
                </div>
                {
                    isEditing ?
                        <EditeComment id={id} body={body} handelEditingBody={handelEditingBody} /> :
                        <div className={styles.body}>{body}</div>
                }
                <Likes id={id} toggleReply={toggleReply} likes={comments[id].likes} />
            </div>
            {!reply ? <></> : <AddComment addComment={addReply} reply_id={id} />}

            {
                replies.length === 0 ? <></> :
                    <div className={styles.comment_list}>
                        {
                            replies.map((id) => <Comment removeComment={removeReply} addComment={addComment} comments={comments} id={id} key={id} />)
                        }
                    </div>
            }

        </div>
    )
}
