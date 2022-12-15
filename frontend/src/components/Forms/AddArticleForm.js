import React from 'react'


import { editProfileInitialValues, EditProfileSchema } from "../../formsConfig";

import FormResource from "../FormResource";

import TextField from "../Fields/TextField";
import ImgField from "../Fields/ImgField"
import ChooseFileBtn from '../Fields/ChooseFileBtn';
import api from '../../api'
import Thumb from '../Thumb';

export default function AddArticleForm() {
    return (

        <FormResource
            url={api.addArticle}
            initialValues={editProfileInitialValues}
            validationSchema={EditProfileSchema}
            submitBtnText="Add"
            ContentType="media"
            method='POST'
        >
            <div style={{ margin: '19px auto' }}>
                <ImgField mode='thumb' defaultImg='/4.jpg' ChooseFileBtn={ChooseFileBtn} Avatar={Thumb} name='image' />
            </div>

            <TextField name="Title" label="Title" placeholder='my title' />
            <TextField name="description" label="description" placeholder='my description' />
            <TextField name="body" label="body" placeholder='my body' />

        </FormResource>
    )
}
