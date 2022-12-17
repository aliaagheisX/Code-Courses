import React from 'react'
import styles from './index.module.css'
import UserSummary from '../UserSummary';
import AdminBtns from './AdminBtns';
import AdminProtectedComponent from '../AdminProtectedComponent';
import Users from '../../Layouts/Users/Users';

export default function TableResource({ headers, extra, data, typeUser }) {
    return (
        <table className={`table ${styles.cont}`} >
            <thead>
                <tr>
                    {headers.map((head) => (
                        <th key={head} scope="col">{head}</th>
                    ))}
                    <AdminProtectedComponent
                        render={<th scope='col'>options</th>}
                    />
                </tr>
            </thead>
            <tbody>
                {
                    data.map((user) => {
                        const join_date = new Date(user.JOINDATE).toDateString().split(' ').slice(1).join(' ');
                        const isAdmin = user.ISADMIN.data[0];
                        return (
                            <tr key={user.ID}>
                                <th scope="row">

                                    <UserSummary
                                        fname={user.FNAME}
                                        lname={user.SNAME}
                                        email={user.EMAIL}
                                        img={user._IMAGE}
                                        id={user.ID} />
                                </th>
                                <td>{join_date}</td>
                                <td>{user.ABOUT}</td>
                                <td>{user[extra]}</td>
                                <td className={isAdmin ? styles.admin : ''}>
                                    {isAdmin ? 'admin' : typeUser}
                                </td>
                                <AdminProtectedComponent
                                    render={<td><AdminBtns id={user.ID} /></td>}
                                    replace={<></>}
                                />


                            </tr>
                        )
                    })
                }

            </tbody>
        </table>
    )
}
