import React from 'react'
import { useFormikContext } from "formik";


export default function Question({ question: { ID, BODY, SCORE }, choices }) {
    const formikProps = useFormikContext();
    const handelChange = (e, body) => {

        const temp = [...formikProps.getFieldProps('answers').value]
        if (e.target.checked) {
            const newValue = { q_id: ID, body: body }
            temp.push(newValue)
            formikProps.setFieldValue('answers', temp)
        }
        else {
            const fltrd = temp.filter(({ q_id: currID, body: currBody }) => !(currID === ID && currBody === body))
            formikProps.setFieldValue('answers', fltrd)

        }
    }
    return (
        <div className="qu">
            <h4>{BODY}</h4>
            <div className='choices'>
                {
                    choices.map(({ body: c_body, id }, ind) => (
                        <div className="form-check" key={ind}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`question.${id}.${ind}`}
                                onChange={(e) => handelChange(e, c_body)}

                            />
                            <label className="form-check-label" htmlFor={`question.${id}.${ind}`}>
                                {c_body}
                            </label>
                        </div>
                    ))
                }
            </div>
            <p className='grade'>points: {SCORE}</p>
        </div>
    )
}
