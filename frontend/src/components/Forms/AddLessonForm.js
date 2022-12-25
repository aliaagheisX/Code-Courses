import React, { useState } from 'react'


import { addLessonInitialValues, AddLessonSchema } from "../../formsConfig";

import TextField from "../Fields/TextField";
import api from '../../api'
import TextAreaField from '../Fields/TextAreaField';
import useToken from '../../useToken';
import { useNavigate } from 'react-router-dom';
import CoursesSelectedForm from './CoursesSelectedForm';
import FormResource from '../FormResource';
import ArticleSelectForm from './ArticleSelectForm';
import QuizzesSelectedForm from './QuizzesSelectedForm';


export default function AddLessonForm({ course_id }) {
    const [myCourseId, setMyCourseId] = useState(course_id);
    const navigate = useNavigate();
    const { token } = useToken()
    return (
        <FormResource
            initialValues={addLessonInitialValues(myCourseId)}
            validationSchema={AddLessonSchema}
            url={api.addLesson}
            isSaveToken={false}
            submitBtnText='Add'
            token={token}
            afterIt={() => navigate(`/courses/${myCourseId}`)}
        >
            <TextField name='name' label='Name' placeholder='enter name of lesson here...' />
            <TextAreaField name='description' label='Description' placeholder='enter description of lesson here...' />
            {!course_id && <CoursesSelectedForm setMyCourseId={setMyCourseId} />}
            <div className="form-group">
                <ArticleSelectForm />
                <QuizzesSelectedForm />
            </div>
        </FormResource>
    )
}
