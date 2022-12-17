import React from 'react'
import TableResource from '../../components/TableResource/TableResource'
import Resource from '../../Resource'
import api from '../../api'
import AdminProtectedComponent from '../../components/AdminProtectedComponent'
import DeleteAll from './DeleteAll'
import useToken from '../../useToken'

export default function Instructors() {
    const { isInstructor, setInstructor } = useToken()
    const headers = ['Name', 'join at', 'about', 'rate', 'type']

    const afterDeleteAll = () => {
        if (isInstructor) {
            setInstructor(0)
        }
    }
    return (


        <Resource
            path={api.getInstructors}
            render={({ items: { instructors } }) => (
                <>
                    <AdminProtectedComponent
                        render={<DeleteAll path={api.deleteAllInstrunctors} afterDelete={afterDeleteAll} />}
                        replace={<></>}
                    />
                    <TableResource
                        headers={headers}
                        data={instructors}

                        extra='RATING'
                        typeUser='instructor'
                    />
                </>
            )}
            ErrorComp={<></>}
        />
    )
}
