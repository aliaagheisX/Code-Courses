import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import useToken from '../../useToken'
export default function Users() {

    const { isAdmin } = useToken()
    return (
        <section>
            <h2>Users</h2>
            <div className='tag-list'>
                <NavLink to="students" className='tag'>
                    all
                </NavLink>

                <NavLink to="instructors" className='tag'>
                    instructors
                </NavLink>

                <NavLink to="admins" className='tag'>
                    admins
                </NavLink>
            </div>

            {isAdmin ? <button className='btnDanger'>Delete All</button> : null}


            <Outlet />


        </section>
    )
}
