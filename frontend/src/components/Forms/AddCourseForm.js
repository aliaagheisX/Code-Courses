import React, { useState } from 'react'


import { addCourseInitialValues, AddCourseSchema } from "../../formsConfig";

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


export default function AddCourseForm() {
    const [backendError, setBackendError] = useState(null); //handeling backend validations
    const { token, userdata: { ID: id } } = useToken()
    const navigate = useNavigate()

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

            const res1 = await fetch(api.addCourse, {
                method: 'POST',
                headers: { "token": token },
                body: formData
            })

            const data = await res1.json()

            if (!res1.ok)
                throw new Error(data.message)

            console.log('added Course', data)

            navigate('/')

        }
        catch (err) {
            console.log(err)
            setBackendError(err.message)
        }
    }
    return (

        <Formik
            initialValues={addCourseInitialValues(id)}
            validationSchema={AddCourseSchema}
            onSubmit={onSubmit}
        >

            {({ isSubmitting }) => (
                <Form encType='multipart/form-data' className='form'>

                    <div style={{ margin: '19px 0' }}>
                        <ImgField mode='thumb' defaultImg='/4.jpg' ChooseFileBtn={ChooseFileBtn} Avatar={Thumb} name='image' />
                    </div>
                    <div className='form-vert'>
                        <div className='group' style={{ flexDirection: 'column' }}>
                            <TextField name="title" label="Title" placeholder='title of course' />
                            <TextField name="description" label="description" placeholder='small summary on what course do' />
                        </div>
                        <TopicListSelection />
                    </div>
                    <TextAreaField mode='textarea' name="pre" label="prerequisites" placeholder='[ ] react' />

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
