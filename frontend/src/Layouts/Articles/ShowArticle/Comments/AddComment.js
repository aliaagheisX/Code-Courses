import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useContext, useState } from 'react'
import Avatar from '../../../../components/Avatar'
import styles from './index.module.css'
import { addCommentInitialValues, AddCommentSchema } from '../../../../formsConfig'
import api from '../../../../api'
import { articleIdContext } from '../Article'
import useToken from '../../../../useToken'

export default function AddComment({ reply_id, addComment }) {
    const { token, userdata } = useToken()
    const article_id = useContext(articleIdContext)
    const [backendError, setBackenError] = useState(null)

    const handelSubmit = async (values) => {
        values.r_id = reply_id
        try {
            const res = await fetch(api.addArticlComments(article_id), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'token': token },
                body: JSON.stringify(values)
            })

            const data = await res.json()
            if (!res.ok) throw Error(data.message)
            addComment(data.comment)
        } catch (err) {
            console.log("error", err)
            setBackenError(err)
        }
    }
    if (token) return (
        <Formik
            initialValues={addCommentInitialValues}
            validationSchema={AddCommentSchema}
            onSubmit={handelSubmit}
        >
            <Form className='form'>
                <div className={styles.frm}>
                    <Avatar avatar={userdata._IMAGE} />
                    <div className='group'>

                        <Field name='comment' type='text' placeholder='Add your comment here...' />
                        <ErrorMessage component="div" name='comment' />
                    </div>
                </div>
                {/* backend error */}
                {backendError &&
                    <span className='errorForm'>
                        {backendError}
                    </span>
                }
            </Form>
        </Formik>
    );
    else return <></>
}
