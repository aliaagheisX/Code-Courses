import React from 'react'
import { Link } from 'react-router-dom'
export default function Quiz() {
    return (
        <section>
            <h2>Quzzies</h2>
            <Link to='add'><button className='btnS' >Add Quiz</button></Link>

        </section>
    )
}