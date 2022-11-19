import React from 'react'
import { Field, ErrorMessage } from 'formik';

export default function TextField({ name, label, placeholder }) {
    return (
        <div className='group'>
            <label htmlFor={name}>{label}</label>
            <Field name={name} placeholder={placeholder} />
            <ErrorMessage component="div" name={name} />
        </div>
    )
}
