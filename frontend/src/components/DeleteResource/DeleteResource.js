import React from 'react'

import { emptyInitialValues, EmptySchema } from '../../formsConfig'

import FormResource from '../FormResource'
import api from '../../api'
import useToken from '../../useToken'

export default function DeleteResource({ path, text, isSaveToken }) {
    const { token, userdata: { ID } } = useToken()

    const initialValues = emptyInitialValues
    initialValues['user'] = {
        'ID': ID
    }

    return (
        <div style={{}}>
            <FormResource
                initialValues={initialValues}
                validationSchema={EmptySchema}
                submitBtnText={text}
                method='DELETE'
                url={path}
                token={token}
                isSaveToken={isSaveToken}
            />
        </div>
    )
}
