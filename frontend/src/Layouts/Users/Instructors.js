import React from 'react'
import TableResource from '../../components/TableResource/TableResource'
import Resource from '../../Resource'
import api from '../../api'

export default function Instructors() {
    const headers = ['Name', 'join at', 'about', 'rate', 'type']
    return (


        <Resource
            path={api.getInstructors}
            render={({ items: { instructors } }) => (
                <TableResource
                    headers={headers}
                    data={instructors}

                    extra='RATING'
                    typeUser='student'
                />
            )} />
    )
}
