import React from 'react'


import { changePasswordInitialValues, ChangePasswordSchema } from "../../formsConfig";

import FormResource from "../FormResource";
import PasswordField from '../Fields/PasswordField';

import api from '../../api'
import useToken from '../../useToken';

export default function ChangePassword() {
    const { token, userdata: { USERNAME } } = useToken()
    return (
        <FormResource
            url={api.editProfile(USERNAME)}
            initialValues={changePasswordInitialValues}
            validationSchema={ChangePasswordSchema}
            submitBtnText="change"
            token={token}
            method='PATCH'
        >
            <PasswordField name="password" label="password" />
            <PasswordField name="confirmPassword" label="confirm password" />
        </FormResource>
    )
}
