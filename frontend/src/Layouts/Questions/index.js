import React from 'react'
import { Link } from 'react-router-dom'
import Resource from '../../Resource'
import QuestionComponent from '../../components/QuestionComponent'
import api from '../../api'

export default function Questions() {
    return (
        <section>
            <h2>Questions</h2>
            <Link to='add'><button className='btnS' >Add Question</button></Link>
            <Resource
                path={api.getInstructorQuestions}
                render={({ items: { Questions } }) => (
                    <div className='elementCont' >
                        {
                            Questions.map((q) => (
                                <QuestionComponent question={q} key={q.ID} />
                            ))
                        }
                    </div>
                )}
                ErrorComp={<></>}
            />
        </section>
    )
}
