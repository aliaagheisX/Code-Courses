import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function ArticleComponent({ article }) {
    const {
        TITLE: title,
        IMAGE: img,
        DESCRIPTION: description,
        likes,
        AUTHORFNAME: fname,
        AUTHORSNAME: lname,
        ID
    } = article;
    const navigate = useNavigate();
    return (
        <div className='component' style={{ backgroundImage: `url(${img})` }}
            onClick={() => navigate(`${ID}`)}>
            <div className='overlay'></div>
            <div className='heading'>
                <h4><Link to={`/articles/${ID}`}> {title}</Link></h4>
                <p className='description'>{description}</p>
            </div>
            <div className='desc'>
                {fname ? <p className='name'>{fname} {lname}</p> : ''}

                <p className='likes'>({likes} <span className="material-symbols-outlined">
                    favorite
                </span>)</p>
            </div>

        </div>

    )
}
