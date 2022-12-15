import React, { useState } from 'react'

export default function Tag({ topicName, topicId, addTag, removeTag }) {
    const [active, setActive] = useState(0)

    const handelClick = () => {
        if (active) {
            setActive(0)
            removeTag(topicId)
        }
        else {
            setActive(1)
            addTag(topicId)
        }
    }
    return (
        <div className={`tag ${active ? 'active' : ''}`} onClick={handelClick}>
            {topicName}
            <span className="material-symbols-outlined">
                {active ? 'done' : 'add'}
            </span>
        </div>
    )
}
