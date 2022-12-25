import React from 'react'
import TableResource from '../../components/TableResource/TableResource'
import Resource from '../../Resource'
import api from '../../api'
import AdminProtectedComponent from '../../components/AdminProtectedComponent'
import DeleteAll from '../../DeleteAll'

export default function Admins() {
    const headers = ['Name', 'join at', 'about', 'score', 'type']
    return (


        <Resource
            path={api.getAdmins}
            render={({ items: { admins } }) => (
                <>
                    <AdminProtectedComponent
                        render={<DeleteAll txt='Delete All' />}
                        replace={<></>}
                    />
                    <TableResource
                        headers={headers}
                        data={admins}

                        extra='SCORE'
                        typeUser='student'
                    />

                </>
            )}
            ErrorComp={<></>}
        />
    )
}
