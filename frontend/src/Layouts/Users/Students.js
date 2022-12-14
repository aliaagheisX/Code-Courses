import React from 'react'
import TableResource from '../../components/TableResource/TableResource'
import Resource from '../../Resource'
import api from '../../api'
export default function Students() {
    const headers = ['Name', 'join at', 'about', 'score', 'type']
    return (


        <Resource
            path={api.getStudents}
            render={({ items: { students } }) => (
                <TableResource
                    headers={headers}
                    data={students}

                    extra='SCORE'
                    typeUser='student'
                />
            )} />
    )
}
