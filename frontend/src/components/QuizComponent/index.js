import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function QuizComponent({ quiz }) {
    const {
        TITLE: title,
        IMAGE: img,
        DESCRIPTION: description,
        numOfQuestions,
        numOfStudents,
        AUTHORFNAME: fname,
        AUTHORSNAME: lname,
        ID
    } = quiz;
    const navigate = useNavigate();
    return (
        <div className='component' style={{ backgroundImage: `url(${img})` }}
            onClick={() => navigate(`/quizzes/${ID}`)}>
            <div className='overlay'></div>
            <div className='heading'>
                <h4><Link to={`/quizzes/${ID}`}> {title}</Link></h4>
                <p className='description'>{description}</p>
            </div>
            <div className='desc'>
                {fname ? <p className='name'>{fname} {lname}</p> : ''}

                <p className='likes'>({numOfStudents} <span className="material-symbols-outlined">
                    group
                </span>)</p>

                <p className='likes'>({numOfQuestions} <span className="material-symbols-outlined">
                    question_mark
                </span>)</p>
            </div>

        </div>

    )
}
