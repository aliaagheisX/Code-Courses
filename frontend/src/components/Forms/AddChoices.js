import React from 'react'
import { ErrorMessage, Formik, useFormikContext } from 'formik';
import TextField from '../Fields/TextField';
import { useState } from 'react';

export default function AddChoices({ choice_number, choice: { body, is_correct }, handelChangeChoice, handelDeleteChoice }) {
    const formikProps = useFormikContext()
    const choice_name = `choice_${choice_number}`;

    const [validError, setValidError] = useState(null)

    const handelChangeBody = (e) => {
        const newBody = e.target.value
        if (newBody.length < 2) {
            setValidError('choice body must be more than 1 character')
        }
        else if (newBody.length > 255) {
            setValidError('choice body must be less than 256 character')
        }
        else {
            setValidError(null)
            handelChangeChoice(choice_number, { body: newBody, is_correct: is_correct })
        }

    }

    return (
        <div className='group'>
            <label htmlFor={choice_name}>choice {choice_number + 1}</label>
            <input
                type='text' placeholder='enter choice body here...'
                name={choice_name}
                onChange={handelChangeBody}
            />
            {
                validError && <div>{validError}</div>
            }
        </div>
    )
}
