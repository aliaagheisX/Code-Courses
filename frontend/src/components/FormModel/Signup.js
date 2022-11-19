import React from 'react';

import { signupInitialValues, SignupSchema } from '../../formsConfig'

import FormResource from '../FormResource';
import EmailField from '../Fields/EmailField';
import PasswordField from '../Fields/PasswordField';
import TextField from '../Fields/TextField'

export default function Signup() {
  return <div>
    <h2>Create an Account</h2>
    <FormResource
      url='signup'
      initialValues={signupInitialValues}
      validationSchema={SignupSchema}
      submitBtnText='sign up'
    >
      <div className='form-group'>
        <TextField name='firstName' label='first name' placeholder='Joe' />
        <TextField name='lastName' label='last name' placeholder='Doe' />
      </div>
      <TextField name='username' label='username' placeholder='JoeDoe' />
      <EmailField />
      <PasswordField name='password' label='password' />
      <PasswordField name='confirmPassword' label='confirm password' />

    </FormResource>
  </div>
}
