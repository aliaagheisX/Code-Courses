import React, { useEffect, useState } from 'react'
import Resource from '../../Resource'
import api from '../../api'
import Tag from './Tag'
import { useFormikContext, ErrorMessage } from 'formik'

export default function TopicListSelection({ InitialTags }) {
    const formikProps = useFormikContext()
    if (InitialTags === undefined) InitialTags = []
    const [tagList, setTagList] = useState(InitialTags)
    console.log(tagList)
    const addTag = (tag) => {
        const temp = tagList
        temp.push(tag)
        setTagList(temp)
    }

    const removeTag = (tag) => {
        const temp = tagList.splice(tagList.indexOf(tag), 1)
        setTagList(temp)
    }
    useEffect(() => {
        setTagList(InitialTags)
    }, [])

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
                            return <Tag key={key} topicName={tname} topicId={tid} removeTag={removeTag} addTag={addTag} />
                        })}
                        <ErrorMessage component="div" name='topics' />
                    </div>
                )}
                ErrorComp={<span>Can't add</span>}

            />
        </div>

    )

}
