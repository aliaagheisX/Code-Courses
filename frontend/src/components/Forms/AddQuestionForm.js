import React, { Fragment, useState } from 'react'
import { addQuestionInitialValues, AddQuestionSchema } from "../../formsConfig";


import api from '../../api'
import TextAreaField from '../Fields/TextAreaField';
import useToken from '../../useToken';

import NumberField from '../Fields/NumberField';
import { FieldArray, Form, Formik } from "formik";
import TextField from '../Fields/TextField';
import { useNavigate } from 'react-router-dom';
export default function AddQuestionForm() {
    const navigate = useNavigate();
    const [backendError, setBackendError] = useState(null); //handeling backend validations

    const { token } = useToken();

    const handelSubmit = async (values) => {
        console.log(values)
        try {
            const res = await fetch(api.addQuestion, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', token: token },
                body: JSON.stringify(values)
            })
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message)
            }
            console.log("success", data);
            setBackendError(null)
            navigate('/questions')
        } catch (e) {
            console.log("error", e);
            setBackendError(e.message)
        }
    }


    return (
        <Formik
            initialValues={addQuestionInitialValues}
            validationSchema={AddQuestionSchema}
            onSubmit={values => console.log(JSON.stringify(values, null, 2))}
        >
            {({ values, handleChange }) => (
                <Form className='form smallTxtBox'>
                    <NumberField name='score' label='score' />
                    <TextAreaField name='body' label='body' placeholder='enter description of question here...' />

                    <FieldArray
                        name='choices'
                        render={arrayHelpers => (
                            <div>
                                {values.choices && values.choices.length > 0 ? (

                                    values.choices.map((choice, ind) => (
                                        <div className='form-group' key={ind} style={{ paddingTop: '20px' }}>

                                            <TextField
                                                name={`choices.${ind}.body`}
                                                label={`choice ${ind + 1}`}
                                                placeholder={`enter choice ${ind + 1} body here..`}
                                            />
                                            <div className='group' style={{ flexGrow: '0' }}>
                                                <label>correct</label>
                                                <label className="switch">
                                                    <input
                                                        type="checkbox" name={`choices.${ind}.is_correct`}
                                                        value={choice.is_correct}
                                                        onChange={() => { values.choices[ind].is_correct = !choice.is_correct }}
                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>


                                        </div>
                                    ))


                                ) : <></>}
                                <div className='btnG' onClick={() => arrayHelpers.push({ body: '', is_correct: 0 })}>+ add choice</div>

                            </div>
                        )
                        }
                    />
                    {backendError &&
                        <span className='errorForm'>
                            {backendError}
                        </span>
                    }
                    <button type="submit" onClick={() => handelSubmit(values)}>
                        <span>Submit</span>

                    </button>
                    {/* <SubmitButton text='submit'  isSubmitting={isSubmitting} /> */}
                </Form>
            )
            }
        </Formik>
    )
}
