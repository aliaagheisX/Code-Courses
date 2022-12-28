import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function QuestionComponent({ question }) {
    const {
        BODY,
        SCORE,
        ID
    } = question;
    const navigate = useNavigate();
    return (
        <div className='component questionComponent' style={{ backgroundColor: `#000` }}>
            <div className='overlay'></div>
            <div className='heading'>
                <h4><Link > {BODY}</Link></h4>
            </div>
            <div className='desc'>

                <p className='likes'>({SCORE}p)</p>
            </div>

        </div>

    )
}
