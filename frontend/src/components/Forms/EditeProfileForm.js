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
    const { token, userdata: { ID, USERNAME, FNAME, SNAME, EMAIL, ABOUT, _IMAGE } } = useToken()
    return (
        <FormResource
            url={api.editProfile(USERNAME)}
            initialValues={editProfileInitialValues}
            validationSchema={EditProfileSchema}
            submitBtnText="submit"
            ContentType="media"
            token={token}
            method='PATCH'
        >
            <div style={{ margin: '19px auto' }}>
                <ImgField mode='avatar' defaultImg={_IMAGE} ChooseFileBtn={ChooseFileBtn} Avatar={Avatar} name='image' />
            </div>
            <div className="form-group">
                <TextField name="firstName" label="first name" placeholder={FNAME} />
                <TextField name="lastName" label="last name" placeholder={SNAME} />
            </div>
            <div className="form-group">
                <TextField name="username" label="username" placeholder={USERNAME} />
                <EmailField placeholder={EMAIL} />
            </div>
            <TextField name="about" label="about" placeholder={ABOUT} />

        </FormResource>
    )
}
