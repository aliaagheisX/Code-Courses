import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function CourseComponent({ course }) {
    const {
        TITLE: title,
        IMAGE: img,
        DESCRIPTION: description,
        enrolls_count,
        INSTRUCTORFNAME: fname,
        INSTRUCTORSNAME: lname,
        ID
    } = course;
    const navigate = useNavigate();
    return (
        <div className='component' style={{ backgroundImage: `url(${img})` }}
            onClick={() => navigate(`/courses/${ID}`)}>
            <div className='overlay'></div>
            <div className='heading'>
                <h4><Link to={`/courses/${ID}`}> {title}</Link></h4>
                <p className='description'>{description}</p>
            </div>
            <div className='desc'>
                {fname ? <p className='name'>{fname} {lname}</p> : ''}

                <p className='likes'>({enrolls_count} <span className="material-symbols-outlined">
                    group
                </span>)</p>
            </div>

        </div>

    )
}
