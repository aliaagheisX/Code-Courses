import React from 'react'
import Resource from '../../Resource'
import api from '../../api'
import Topic from './Topic'
export default function Topics() {
    return (
        <section>
            <h2>Topics</h2>
            <div className='tag-list' style={{ maxWidth: '85%' }}>
                <Resource
                    path={api.getTopics}
                    render={({ items: { topics } }) => (

                        <>
                            <Topic tagName='add' isAdd={1} />
                            {Object.keys(topics).map((topicK) => (
                                <Topic tagName={topics[topicK].NAME} id={topics[topicK].ID} key={topicK} isAdd={0} />
                            ))}
                        </>

                    )}

                    ErrorComp={<Topic tagName='add' isAdd={1} />}

                />
            </div>
        </section>
    )
}
