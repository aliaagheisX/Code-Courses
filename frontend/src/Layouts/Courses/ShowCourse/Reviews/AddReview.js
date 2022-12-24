import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useState } from 'react'
import Avatar from '../../../../components/Avatar'
import styles from './index.module.css'
import { AddReviewSchema } from '../../../../formsConfig'
import api from '../../../../api'
import useToken from '../../../../useToken'

export default function AddReview({ review, setReview }) {
    const { token, userdata } = useToken()
    const [backendError, setBackenError] = useState(null)


    const initialValues = review ? {
        body: review.REVIEWBODY,
        rateing: review.REVIEWRATING
    } : {
        body: '',
        rateing: 0
    }
    const handelSubmit = async (values) => {
        /* try {
            const res = await fetch(api.addArticlComments(article_id), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'token': token },
                body: JSON.stringify(values)
            })

            const data = await res.json()
            if (!res.ok) throw Error(data.message)
            setReview(data.review)
        } catch (err) {
            console.log("error", err)
            setBackenError(err)
        } */
    }
    if (token) return (
        <Formik
            initialValues={initialValues}
            validationSchema={AddReviewSchema}
            onSubmit={handelSubmit}
        >
            <Form className='form'>
                <div className={styles.frm}>
                    <Avatar avatar={userdata._IMAGE} />
                    <div className='group'>

                        <Field name='comment' type='text' placeholder='Add your review here...' />
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
