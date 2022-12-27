import React from 'react'
import { Link } from 'react-router-dom'

export default function Questions() {
    return (
        <section>
            <h2>Questions</h2>
            <Link to='add'><button className='btnS' >Add Question</button></Link>

        </section>
    )
}
