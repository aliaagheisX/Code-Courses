import React, { useState } from 'react'


import { addLessonInitialValues, EditLessonSchema } from "../../formsConfig";

import TextField from "../Fields/TextField";
import api from '../../api'
import TextAreaField from '../Fields/TextAreaField';
import useToken from '../../useToken';
import { useNavigate } from 'react-router-dom';
import CoursesSelectedForm from './CoursesSelectedForm';
import FormResource from '../FormResource';
import ArticleSelectForm from './ArticleSelectForm';
import QuizzesSelectedForm from './QuizzesSelectedForm';


export default function EditLessonForm({ lesson }) {
    const [myCourseId, setMyCourseId] = useState(lesson.CID);
    const navigate = useNavigate();
    const { token } = useToken()
    return (
        <FormResource
            initialValues={addLessonInitialValues(myCourseId)}
            validationSchema={EditLessonSchema}
            url={api.editLesson(lesson.LID)}
            isSaveToken={false}
            submitBtnText='update'
            method='PATCH'
            token={token}
            afterIt={() => navigate(`/courses/${myCourseId}`)
            }
        >
            <TextField name='name' label='Name' placeholder={lesson.NAME} />
            <TextAreaField name='description' label='Description' placeholder={lesson.DESCRIPTION} />
            <CoursesSelectedForm setMyCourseId={setMyCourseId} inital={lesson.CID} />
            <div className="form-group">
                <ArticleSelectForm inital={lesson.AID} />
                <QuizzesSelectedForm inital={lesson.QID} />
            </div>
        </FormResource>
    )
}
