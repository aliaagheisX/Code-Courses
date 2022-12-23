import React from 'react'
import Resource from '../../../Resource'
import { useParams } from 'react-router-dom'
import api from '../../../api';
import Course from './Course';

export default function ShowCourse() {
    const { id } = useParams();

    return (

        <Resource
            path={api.getCourse(id)}
            render={({ items }) => (<Course course={items} />)
            }
        />
    )
}
