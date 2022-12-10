import React from 'react'
import { Field, ErrorMessage } from 'formik';

export default function EmailField({ placeholder }) {
    if (!placeholder) placeholder = "JoeDoe@gmail.com"
    return (
        <div className='group'>
            <label htmlFor="email">email</label>
            <Field id="email" name="email" type="email" placeholder={placeholder} />
            <ErrorMessage component="div" name='email' />
        </div>
    )
}