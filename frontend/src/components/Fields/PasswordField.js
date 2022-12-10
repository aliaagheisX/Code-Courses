import React from 'react'
import { Field, ErrorMessage } from 'formik';


export default function PasswordField({ name, label }) {
    return (
        <div className='group'>
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name} type="password" placeholder="*************" />
            <ErrorMessage component="div" name={name} />
        </div>
    )
}
