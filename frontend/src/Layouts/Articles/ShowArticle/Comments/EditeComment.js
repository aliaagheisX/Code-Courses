import { Field, Formik, Form, ErrorMessage } from 'formik'
import { EditeCommentSchema } from '../../../../formsConfig'
import styles from './index.module.css'
import React from 'react'
import api from '../../../../api'
import useToken from '../../../../useToken'

export default function EditeComment({ id, body, handelEditingBody }) {
    const { token } = useToken()
    const handelSubmit = async (values) => {
        try {
            const res = await fetch(api.editeComment(id), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'token': token },
                body: JSON.stringify(values)
            })
            const data = await res.json()
            if (!res.ok) throw data.message
            console.log("success", data)
            handelEditingBody(values.new_comment)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Formik
            initialValues={{ new_comment: body }}
            validationSchema={EditeCommentSchema}
            onSubmit={handelSubmit}
        >
            <Form className='form'>
                <div className={styles.frm}>
                    <div className='group'>

                        <Field name='new_comment' type='text' placeholder='Add your comment here...' />
                        <ErrorMessage component="div" name='new_comment' />
                    </div>
                </div>
            </Form>

        </Formik>
    )
}
