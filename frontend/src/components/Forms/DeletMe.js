import React from 'react'

import { emptyInitialValues, EmptySchema } from '../../formsConfig'

import FormResource from '../FormResource'
import api from '../../api'
import useToken from '../../useToken'

export default function DeletMe() {
    const { token, userdata: { ID } } = useToken()

    const initialValues = emptyInitialValues
    initialValues['user'] = {
        'ID': ID
    }

    return (
        <FormResource
            initialValues={initialValues}
            validationSchema={EmptySchema}
            submitBtnText='Delete Me'
            method='DELETE'
            url={api.deleteMe}
            token={token}

        />
    )
}
