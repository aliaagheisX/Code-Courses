import React from 'react'
import api from '../../api'
import Resource from '../../Resource'
import useToken from '../../useToken'
import Select from 'react-select';
import { ErrorMessage, useFormikContext } from 'formik';
import { Link } from 'react-router-dom';

export default function QuizzesSelectedForm({ inital }) {
    const { userdata } = useToken()
    const formikProps = useFormikContext()
    return (
        <div>
            <label htmlFor='qid'>Quizzes</label>
            <Resource
                path={api.getInstructorQuizzes(userdata.ID)}
                render={({ items: { Quizzes: quizzes } }) => {
                    const options = quizzes.map((item) => ({
                        label: `${item.ID} - ${item.TITLE}`,
                        value: item.ID
                    }))
                    const defaultV = options.filter((item) => item.value === inital)[0];
                    return (
                        <>
                            <Select
                                className='customSelect'
                                options={options}
                                defaultValue={defaultV}
                                isSearchable={1}
                                name="qid"
                                placeholder="Choose your quiz"
                                isClearable={1}
                                onChange={(v) => formikProps.setFieldValue('qid', v ? v.value : '')}
                            />
                            <div className='group'>
                                <ErrorMessage component="div" name='qid' />
                            </div>
                        </>
                    )

                }}
                ErrorComp={
                    <>
                        <Select
                            className='customSelect'
                            options={{}}
                            isSearchable={1}
                            name="cid"
                            placeholder="No quiz to select"
                            isClearable={1}
                            isDisabled={1}
                        />

                        <Link to='/quizzes/add'>
                            <div className='errorLink'>add quiz</div>
                        </Link>
                    </>
                }

            />

        </div>
    )
}
