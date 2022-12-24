import React, { useEffect, useState } from 'react'
import Resource from '../../Resource'
import api from '../../api'
import Tag from './Tag'
import { useFormikContext, ErrorMessage } from 'formik'

export default function TopicListSelection({ initialTopics }) {
    if (initialTopics === undefined)
        initialTopics = []

    const formikProps = useFormikContext()
    const [tagList, setTagList] = useState([])
    const addTag = (tag) => {
        const temp = tagList
        temp.push(tag)
        setTagList(temp)
    }

    const removeTag = (tag) => {
        const temp = tagList;
        temp.splice(tagList.indexOf(tag), 1)
        setTagList(temp)
    }

    const isActive = (tag_id) => {
        return (tagList.indexOf(tag_id) !== -1)
    }


    useEffect(() => {
        const temp = []
        initialTopics.map(({ NAME, TID }) => {
            temp.push(TID)
        })
        setTagList(temp)

    }, [])
    useEffect(() => {
        formikProps.setFieldValue('topics', tagList)
    }, [tagList])

    return (
        <div>
            <label style={{ marginLeft: '12px' }}>Topics</label>
            <Resource
                path={api.getTopics}
                render={({ items: { topics } }) => (
                    <div className='tag-list'>

                        {Object.keys(topics).map(key => {
                            const tid = topics[key].ID
                            const tname = topics[key].NAME
                            const active = isActive(tid)
                            return <Tag active={active} key={key} topicName={tname} topicId={tid} removeTag={removeTag} addTag={addTag} />
                        })}
                        <ErrorMessage component="div" name='topics' />
                    </div>
                )}
                ErrorComp={<div className='tag error'>No tags</div>}

            />
        </div>

    )

}
