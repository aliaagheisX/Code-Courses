import React from 'react'
import api from '../../api'
import Resource from '../../Resource'
import useToken from '../../useToken'
import Select from 'react-select';
import { ErrorMessage, useFormikContext } from 'formik';
import { Link } from 'react-router-dom';

export default function QuestionsSelectedForm({ questions, handelChange }) {
    const formikProps = useFormikContext();
    const options = questions.map((item) => ({
        label: `${item.ID} - ${item.BODY}`,
        value: item.ID
    }))

    return (
        <div>
            <label htmlFor='questions'>Questions</label>

            <Select
                className='customSelect'
                options={options}
                isSearchable={1}
                name='questions'
                placeholder="Choose your question"
                isClearable={1}
                isMulti
                onChange={(v) => {
                    const newState = v.map((i) => i.value);
                    formikProps.setFieldValue('questions', newState);
                }}
            />
            <div className='group'>
                <ErrorMessage component="div" name='questions' />
            </div>
            {options.length === 0 &&
                <>
                    <Select
                        className='customSelect'
                        options={{}}
                        isSearchable={1}
                        name="nid"
                        placeholder="No question to select"
                        isClearable={1}
                        isDisabled={1}
                    />

                    <Link to='/questions/add'>
                        <div className='errorLink'>add question</div>
                    </Link>
                </>
            }



        </div>
    )
}
