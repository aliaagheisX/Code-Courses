import React, { useEffect } from 'react';

import { loginInitialValues, LoginSchema } from '../../formsConfig'

import FormResource from '../FormResource';
import EmailField from '../Fields/EmailField';
import PasswordField from '../Fields/PasswordField';
import api from '../../api'
import useToken from '../../useToken';


export default function Login() {

  return <div>
    <h2>Welcome Back</h2>
    <FormResource
      url={api.login}
      initialValues={loginInitialValues}
      validationSchema={LoginSchema}
      submitBtnText='Login'
    >



      <EmailField />
      <PasswordField name='password' label='password' />


    </FormResource>
  </div>
}
