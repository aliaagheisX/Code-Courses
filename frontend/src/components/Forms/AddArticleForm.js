import React, { useState } from 'react'


import { addArticleInitialValues, AddArticleSchema } from "../../formsConfig";

import TextField from "../Fields/TextField";
import ImgField from "../Fields/ImgField"
import ChooseFileBtn from '../Fields/ChooseFileBtn';
import api from '../../api'
import Thumb from '../Thumb';
import TopicListSelection from '../TopicListSelection';
import TextAreaField from '../Fields/TextAreaField';
import useToken from '../../useToken';
import SubmitButton from '../Fields/SubmitButton'
import { Formik, Form, ErrorMessage } from 'formik';


export default function AddArticleForm() {
    const [backendError, setBackendError] = useState(null); //handeling backend validations
    const { token, userdata: { ID: id } } = useToken()

    const onSubmit = async (values) => {
        try {

            const formData = new FormData();

            Object.keys(values).forEach((key) => {
                if (key !== 'topics') {
                    formData.append(key, values[key])
                }
            });
            const myHeader = new Headers();
            myHeader.append('token', token)
            myHeader.append('Content-Type', undefined)
            const res1 = await fetch(api.addArticle, {
                method: 'POST',
                headers: { "token": token },
                body: formData
            })

            const dataE = await res1.json()

            if (!res1.ok)
                throw dataE.message

            console.log('added Article', dataE)
            /* 
            
            */
            const res2 = await fetch(api.addArticleTopics(dataE.article.ID), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'token': token },
                body: JSON.stringify({ topics: values.topics })
            })
            const dataT = await res2.json()

            if (!res2.ok)
                throw dataT.message

            console.log({
                Article: dataE,
                Topics: dataT
            })

        }
        catch (err) {
            console.log(err)
            setBackendError(err)
        }
    }
    return (

        <Formik
            initialValues={addArticleInitialValues(id)}
            validationSchema={AddArticleSchema}
            onSubmit={onSubmit}
        >

            {({ isSubmitting }) => (
                <Form encType='multipart/form-data' className='form'>

                    <div style={{ margin: '19px 0' }}>
                        <ImgField mode='thumb' defaultImg='/4.jpg' ChooseFileBtn={ChooseFileBtn} Avatar={Thumb} name='image' />
                    </div>
                    <div className='form-vert'>
                        <div className='group' style={{ flexDirection: 'column' }}>
                            <TextField name="title" label="Title" placeholder='my title' />
                            <TextField name="description" label="description" placeholder='small summary on what article do' />
                        </div>
                        <TopicListSelection />
                    </div>
                    <TextAreaField mode='textarea' name="body" label="body" placeholder='hate react 😔' />


                    <SubmitButton text='Add' isSubmitting={isSubmitting} />


                </Form>
            )}
        </Formik>

    )
}
