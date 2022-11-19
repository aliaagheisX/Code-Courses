import React from 'react';

import { loginInitialValues, LoginSchema } from '../../formsConfig'

import FormResource from '../FormResource';
import EmailField from '../Fields/EmailField';
import PasswordField from '../Fields/PasswordField';

export default function Login() {
  return <div>
    <h2>Welcome Back</h2>
    <FormResource
      url='login'
      initialValues={loginInitialValues}
      validationSchema={LoginSchema}
      submitBtnText='Login'
    >



      <EmailField />
      <PasswordField name='password' label='password' />


    </FormResource>
  </div>
}
