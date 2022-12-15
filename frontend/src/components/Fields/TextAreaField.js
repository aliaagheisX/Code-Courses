import React from 'react'
import { Field, ErrorMessage } from 'formik';

export default function TextAreaField({ name, label, placeholder }) {
    return (
        <div className='group'>
            <label htmlFor={name}>{label}</label>
            <Field as='textarea' name={name} placeholder={placeholder} id={name} />
            <ErrorMessage component="div" name={name} />
        </div>
    )
}
