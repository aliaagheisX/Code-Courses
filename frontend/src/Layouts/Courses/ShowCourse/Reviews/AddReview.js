import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useState } from 'react'
import Avatar from '../../../../components/Avatar'
import styles from './index.module.css'
import { AddReviewSchema } from '../../../../formsConfig'
import api from '../../../../api'
import useToken from '../../../../useToken'

export default function AddReview({ id, review, chReview }) {
    const { token, userdata } = useToken()
    const [rateValue, setRateValue] = useState(review ? review.REVIEWRATING : 0)
    const [backendError, setBackenError] = useState(null)

    const initialValues = review ? { body: review.REVIEWBODY } : { body: '' }
    const handelSubmit = async (values) => {
        values.rating = rateValue;

        try {
            const res = await fetch(api.editReview(id, userdata.ID), {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'token': token },
                body: JSON.stringify(values)
            })

            const data = await res.json()
            if (!res.ok) throw Error(data.message)
            chReview(data.review, data.rating)
        } catch (err) {
            console.log("error", err)
            setBackenError(err)
        }
    }
    if (token) return (
        <Formik
            initialValues={initialValues}
            validationSchema={AddReviewSchema}
            onSubmit={handelSubmit}
        >
            <Form className='form'>
                <div>
                    <div className={styles.frm}>
                        <Avatar avatar={userdata._IMAGE} />
                        <div className='group'>

                            <Field name='body' type='text' placeholder='Add your review here...' />
                            <ErrorMessage component="div" name='body' />
                        </div>
                    </div>

                    <div className={styles.stars}>
                        <span className={`material-symbols-outlined ${rateValue > 0 ? '' : styles.emptyStar}`} onClick={() => setRateValue(rateValue === 1 ? 0 : 1)}> star </span>
                        <span className={`material-symbols-outlined ${rateValue > 1 ? '' : styles.emptyStar}`} onClick={() => setRateValue(2)}> star </span>
                        <span className={`material-symbols-outlined ${rateValue > 2 ? '' : styles.emptyStar}`} onClick={() => setRateValue(3)}> star </span>
                        <span className={`material-symbols-outlined ${rateValue > 3 ? '' : styles.emptyStar}`} onClick={() => setRateValue(4)}> star </span>
                        <span className={`material-symbols-outlined ${rateValue > 4 ? '' : styles.emptyStar}`} onClick={() => setRateValue(5)}> star </span>

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
