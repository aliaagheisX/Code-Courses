import React, { useState } from 'react'

export default function Tag({ active: activeIn, topicName, topicId, addTag, removeTag }) {
    if (activeIn === undefined)
        activeIn = 0
    const [active, setActive] = useState(activeIn)

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
