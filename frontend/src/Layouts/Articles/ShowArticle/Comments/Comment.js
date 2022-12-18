import React, { useState } from 'react'
import AddComment from './AddComment'
import styles from './index.module.css'
import Likes from './Likes'
import Summary from './Summary'

export default function Comment({ MapComments, id }) {
    const [reply, setReply] = useState(0)
    const toggleReply = () => {
        setReply(!reply);
    }
    return (
        <div className={styles.comment}>
            <div className={styles.mainComment}>
                <Summary comment={MapComments[id]} />
                <div className={styles.body}>{MapComments[id].BODY}</div>
                <Likes toggleReply={toggleReply} likes={MapComments[id].likes} />
            </div>
            {!reply ? <></> : <AddComment />}

            {
                MapComments[id].replies.length === 0 ? <></> :
                    <div className={styles.comment_list}>
                        {
                            MapComments[id].replies.map((id) => <Comment MapComments={MapComments} id={id} key={id} />)
                        }
                    </div>
            }

        </div>
    )
}
