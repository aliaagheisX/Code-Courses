import React from 'react'
import api from '../../api'
import Resource from '../../Resource'
import useToken from '../../useToken'
import Select from 'react-select';
import { ErrorMessage, useFormikContext } from 'formik';
import { Link } from 'react-router-dom';

export default function ArticleSelectForm({ inital }) {
    const { userdata } = useToken()
    const formikProps = useFormikContext()

    return (
        <div>
            <label htmlFor='aid'>Articles</label>
            <Resource
                path={api.getInstructorArticles(userdata.ID)}
                render={({ items: { articles } }) => {
                    const options = articles.map((item) => ({
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
                                name="aid"
                                placeholder="Choose your article ..."
                                isClearable={1}
                                onChange={(v) => formikProps.setFieldValue('aid', v ? v.value : '')}
                            />
                            <div className='group'>
                                <ErrorMessage component="div" name='aid' />
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
                            name="aid"
                            placeholder="No article to select"
                            isClearable={1}
                            isDisabled={1}
                        />

                        <Link to='/articles/add'>
                            <div className='errorLink'>add article</div>
                        </Link>
                    </>
                }

            />



        </div>
    )
}
