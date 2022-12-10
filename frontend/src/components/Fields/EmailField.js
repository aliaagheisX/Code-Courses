import React from 'react'
import { Field, ErrorMessage } from 'formik';

export default function EmailField() {
    return (
        <div className='group'>
            <label htmlFor="email">email</label>
            <Field id="email" name="email" type="email" placeholder="JoeDoe@gmail.com" />
            <ErrorMessage component="div" name='email' />
        </div>
    )
}