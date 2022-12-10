import React from 'react'


import { editProfileInitialValues, EditProfileSchema } from "../../formsConfig";

import FormResource from "../FormResource";
import EmailField from "../Fields/EmailField";

import TextField from "../Fields/TextField";
import ImgField from "../Fields/ImgField"
import ChooseFileBtn from '../Fields/ChooseFileBtn';
import Avatar from '../Avatar';
import api from '../../api'
import useToken from '../../useToken';

export default function EditeProfileForm() {
    const { token, userdata: { } } = useToken()
    return (
        <FormResource
            url={api.editProfile}
            initialValues={editProfileInitialValues}
            validationSchema={EditProfileSchema}
            submitBtnText="submit"
            ContentType=""
        >
            <div style={{ margin: '19px auto' }}>
                <ImgField defaultImg='/a1.jpg' ChooseFileBtn={ChooseFileBtn} Avatar={Avatar} name='image' />
            </div>
            <div className="form-group">
                <TextField name="firstName" label="first name" placeholder="Joe" />
                <TextField name="lastName" label="last name" placeholder="Doe" />
            </div>
            <div className="form-group">
                <TextField name="username" label="username" placeholder="JoeDoe" />
                <EmailField />
            </div>
            <TextField name="about" label="about" placeholder="JoeDoe" />

        </FormResource>
    )
}
