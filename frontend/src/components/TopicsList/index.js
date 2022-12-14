import React from 'react'
import Resource from '../../Resource'
import api from '../../api'
export default function TopicsList() {
    return (
        <Resource
            path={api.getTopics}
            render={({ items: { topics } }) => (
                <div className='tag-list'>
                    {Object.keys(topics).map((topicK) => (
                        <div key={topicK} className='tag'>
                            {topics[topicK].NAME}
                        </div>
                    ))}
                </div>
            )}

        />
    )
}
