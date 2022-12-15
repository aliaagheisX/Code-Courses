import React, { useState } from 'react'

/* for saveing token */
import useToken from '../useToken'

/* for forms */
import { Formik, Form } from 'formik';

import SubmitButton from './Fields/SubmitButton';

export default function FormResource({ token, method, ContentType, url, initialValues, validationSchema, children, submitBtnText }) {

    if (!method) method = 'POST'

    const [backendError, setBackendError] = useState(null); //handeling backend validations
    const { setToken } = useToken() //to save token


    const onSubmit = async (values) => {
        console.log(values)
        try {
            /* send request */
            /* header */
            const myHeader = new Headers();


            if (!ContentType) {
                myHeader.append('Content-Type', 'application/json')
                values = JSON.stringify(values)
            }
            else {
                const formData = new FormData();

                Object.keys(values).forEach((key) => {
                    formData.append(key, values[key])
                });
                values = formData;
            }

            if (token)
                myHeader.append('token', token)

            console.log(values)


            const res = await fetch(url, {
                method: method,
                headers: myHeader,
                body: values
            });

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message)
            }
            else {
                setToken(data)
                window.location.reload()

            }

        }
        catch (e) {
            setBackendError(e.message)
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >

            {({ isSubmitting }) => (
                <Form encType='multipart/form-data' className='form'>

                    {children}

                    {/* backend error */}
                    {backendError &&
                        <span className='errorForm'>
                            {backendError}
                        </span>
                    }

                    <SubmitButton text={submitBtnText} isSubmitting={isSubmitting} />


                </Form>
            )}
        </Formik>
    )

}
