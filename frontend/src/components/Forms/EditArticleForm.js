import React, { useState } from 'react'


import { editArticleInitialValues, EditArticleSchema } from "../../formsConfig";

import TextField from "../Fields/TextField";
import ImgField from "../Fields/ImgField"
import ChooseFileBtn from '../Fields/ChooseFileBtn';
import api from '../../api'
import Thumb from '../Thumb';
import TopicListSelection from '../TopicListSelection';
import TextAreaField from '../Fields/TextAreaField';
import useToken from '../../useToken';
import SubmitButton from '../Fields/SubmitButton'
import Resource from '../../Resource';
import { Formik, Form } from 'formik';

export default function EditArticleForm({ article }) {
    const [backendError, setBackendError] = useState(null); //handeling backend validations
    const { token } = useToken()

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
            const res1 = await fetch(api.editArticle(article.ID), {
                method: 'PATCH',
                headers: { "token": token },
                body: formData
            })

            const dataE = await res1.json()

            if (!res1.ok)
                throw dataE.message

            console.log('edited Article', dataE)
            /* 
                ======================
            */
            const res2 = await fetch(api.editArticleTopics(article.ID), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'token': token },
                body: JSON.stringify({ topics: values.topics })
            })
            const dataT = await res2.json()

            if (!res2.ok)
                throw dataT.message

            window.location.assign(`/articles/${article.ID}`)
        }
        catch (err) {
            console.log(err)
            setBackendError(err)
        }
    }
    return (

        <Formik
            initialValues={editArticleInitialValues(article.ID, article.BODY)}
            validationSchema={EditArticleSchema}
            onSubmit={onSubmit}
        >

            {({ isSubmitting }) => (
                <Form encType='multipart/form-data' className='form'>

                    <div style={{ margin: '19px 0' }}>
                        <ImgField mode='thumb' defaultImg={article.IMAGE} ChooseFileBtn={ChooseFileBtn} Avatar={Thumb} name='image' />
                    </div>
                    <div className='form-vert'>
                        <div className='group' style={{ flexDirection: 'column' }}>
                            <TextField name="title" label="Title" placeholder={article.TITLE} />
                            <TextField name="description" label="description" placeholder={article.DESCRIPTION} />
                        </div>


                        <Resource
                            path={api.getArticleTopics(article.ID)}
                            render={({ items: { topics } }) => (
                                <TopicListSelection initialTopics={topics} />

                            )}
                            ErrorComp={<TopicListSelection />}
                        />
                    </div>
                    <TextAreaField mode='textarea' name="body" label="body" />

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
