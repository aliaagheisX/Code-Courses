import { Formik, Form, Field } from 'formik'
import React from 'react'
import Avatar from '../../../../components/Avatar'
import styles from './index.module.css'
import { addCommentInitialValues, AddCommentSchema } from '../../../../formsConfig'
export default function AddComment() {
    return (
        <Formik
            initialValues={addCommentInitialValues}
            validationSchema={AddCommentSchema}
        >
            <Form className='form'>
                <div className={styles.frm}>
                    <Avatar avatar={'/15-08.jpg'} />
                    <Field type='text' placeholder='Add your comment here...' />
                </div>
            </Form>
        </Formik>
    )
}
