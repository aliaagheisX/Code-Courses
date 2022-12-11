import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import TagList from '../../components/TagList'
import Tags from '../../components/Tags'
import useToken from '../../useToken'
export default function Users() {
    const { isAdmin } = useToken()
    const options = {
        all: [1, "/users/"],
        instructor: [0, "/users/instructors"],
        admins: [0, "/users/admins"],
    }
    return (
        <section>
            <h2>Users</h2>
            <TagList items={options} />

            {isAdmin ? <button>Delete All</button> : null}

            <Link to='students' > hi</Link>

            <Outlet />


        </section>
    )
}
