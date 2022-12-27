import React from 'react'
import { ErrorMessage, useFormikContext } from 'formik';

export default function NumberField({ name, label }) {
    const formikProps = useFormikContext()
    const handelChange = (e) => {
        const v = e.target.value;
        formikProps.setFieldValue(name, v);
    }
    return (
        <div className="group">
            <label htmlFor={name}>{label}</label>
            <input
                style={{ maxWidth: '70px' }}
                type='number' min='0'
                name={name} id={name}
                onChange={handelChange}
            />
            <ErrorMessage component="div" name={name} />

        </div>
    )
}
