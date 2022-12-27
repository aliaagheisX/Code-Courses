import React from 'react'
import InstructorProtectedComponent from '../../components/InstructorProtectedComponent'
import Resource from '../../Resource'
import { Link } from 'react-router-dom'
import api from '../../api'
import QuizComponent from '../../components/QuizComponent'
export default function Quiz() {
    return (
        <section>
            <h2>Quzzies</h2>
            <InstructorProtectedComponent
                render={<Link to='add'><button className='btnS' >Add Quiz</button></Link>}
                replace={<></>}
            />
            <Resource
                path={api.getAllQuizzes}
                render={({ items: { quizzes } }) => (
                    <div className='elementCont' >
                        {
                            quizzes.map((quiz) => (
                                <QuizComponent quiz={quiz} key={quiz.ID} />
                            ))
                        }
                    </div>
                )}
                ErrorComp={<></>}
            />
        </section>
    )
}