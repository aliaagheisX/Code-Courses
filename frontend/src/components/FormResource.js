import React, { useState } from 'react'

/* for saveing token */
import useToken from '../useToken'

/* for forms */
import { Formik, Form } from 'formik';

import SubmitButton from './Fields/SubmitButton';

export default function FormResource({ url, initialValues, validationSchema, children, submitBtnText, ContentType }) {
    if (!ContentType) ContentType = 'application/json'

    const [backendError, setBackendError] = useState(null); //handeling backend validations
    const { setToken } = useToken() //to save token


    const onSubmit = async (values) => {
        try {
            /* send request */
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': ContentType },
                body: JSON.stringify(values)
            });

            const data = await res.json()
            /* validate response */
            if (!res.ok) {
                console.log(data);
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
                <Form>

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
