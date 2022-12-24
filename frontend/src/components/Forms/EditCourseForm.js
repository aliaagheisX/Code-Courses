import React, { useState } from 'react'


import { EditCourseSchema } from "../../formsConfig";

import TextField from "../Fields/TextField";
import ImgField from "../Fields/ImgField"
import ChooseFileBtn from '../Fields/ChooseFileBtn';
import api from '../../api'
import Thumb from '../Thumb';
import TopicListSelection from '../TopicListSelection';
import TextAreaField from '../Fields/TextAreaField';
import useToken from '../../useToken';
import SubmitButton from '../Fields/SubmitButton'
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';


export default function EditCourseForm({ course }) {
    const [backendError, setBackendError] = useState(null); //handeling backend validations
    const { token, userdata } = useToken()
    const navigate = useNavigate()

    const {
        DESCRIPTION, ID: course_id, IMAGE: img, PREREQUISITES: pre, TITLE: title
    } = course.course

    const initialValues = {
        image: null,
        title: '',
        description: '',
        pre: '',
        topics: course.topics
    }

    const onSubmit = async (values) => {


        try {

            const formData = new FormData();

            Object.keys(values).forEach((key) => {
                if (key === 'topics') {

                    formData.append(key, JSON.stringify(values[key]))
                }
                else {
                    formData.append(key, values[key])
                }
            });

            const res1 = await fetch(api.editCourse(course_id), {
                method: 'PATCH',
                headers: { "token": token },
                body: formData
            })

            const data = await res1.json()

            if (!res1.ok)
                throw new Error(data.message)

            console.log('edites Course', data)

            navigate(`/courses/${course_id}`)

        }
        catch (err) {
            console.log(err)
            setBackendError(err.message)
        }
    }
    return (

        <Formik
            initialValues={initialValues}
            validationSchema={EditCourseSchema}
            onSubmit={onSubmit}
        >

            {({ isSubmitting }) => (
                <Form encType='multipart/form-data' className='form'>

                    <div style={{ margin: '19px 0' }}>
                        <ImgField mode='thumb' defaultImg={img} ChooseFileBtn={ChooseFileBtn} Avatar={Thumb} name='image' />
                    </div>
                    <div className='form-vert'>
                        <div className='group' style={{ flexDirection: 'column' }}>
                            <TextField name="title" label="Title" placeholder={title} />
                            <TextField name="description" label="description" placeholder={DESCRIPTION} />
                        </div>
                        <TopicListSelection initialTopics={course.topics} />
                    </div>
                    <TextAreaField mode='textarea' name="pre" label="prerequisites" placeholder={pre} />

                    {/* backend error */}
                    {backendError &&
                        <span className='errorForm'>
                            {backendError}
                        </span>
                    }

                    <SubmitButton text='Add' isSubmitting={isSubmitting} />


                </Form>
            )}
        </Formik>

    )
}
