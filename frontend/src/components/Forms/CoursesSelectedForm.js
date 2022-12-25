import React from 'react'
import api from '../../api'
import Resource from '../../Resource'
import useToken from '../../useToken'
import Select from 'react-select';
import { ErrorMessage, useFormikContext } from 'formik';

export default function CoursesSelectedForm({ setMyCourseId, inital }) {
    const { userdata } = useToken()
    const formikProps = useFormikContext()

    return (
        <div>
            <label htmlFor='cid'>Courses</label>
            <Resource
                path={api.getInstructorCourses(userdata.ID)}
                render={({ items: { courses } }) => {
                    const options = courses.map((item) => ({
                        label: `${item.ID} - ${item.TITLE}`,
                        value: item.ID
                    }))
                    const defaultV = options.filter((item) => item.value === inital)[0];

                    return (
                        <>
                            <Select
                                className='customSelect'
                                options={options}
                                isSearchable={1}
                                defaultValue={defaultV}
                                name="cid"
                                placeholder="Choose your Course"
                                isClearable={1}
                                onChange={(v) => {
                                    const nv = v ? v.value : '';
                                    formikProps.setFieldValue('cid', nv);
                                    setMyCourseId(nv)
                                }}
                            />
                            <div className='group'>
                                <ErrorMessage component="div" name='cid' />
                            </div>
                        </>

                    )

                }}
                ErrorComp={
                    <Select
                        className='customSelect'
                        options={{}}
                        isSearchable={1}
                        name="cid"
                        placeholder="No courses to select"
                        isClearable={1}
                        isDisabled={1}
                    />
                }

            />


        </div>
    )
}
