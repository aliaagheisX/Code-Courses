import React from 'react'
import UserSummary from '../../../components/UserSummary'
import styles from './index.module.css'
import Resource from '../../../Resource'
import api from '../../../api'
export default function Students() {
    return (


        < table className={`table ${styles.cont}`} >
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Join at</th>
                    <th scope="col">about</th>
                    <th scope="col">score</th>
                    <th scope="col">type</th>
                </tr>
            </thead>
            <tbody>
                <Resource
                    path={api.getStudents}
                    render={({ items: { students } }) => (
                        students.map((student) => {
                            const join_date = new Date(student.JOINDATE).toDateString().split(' ').slice(1).join(' ');
                            const isAdmin = student.ISADMIN.data[0];
                            return (
                                <tr>
                                    <th scope="row">

                                        <UserSummary
                                            fname={student.FNAME}
                                            lname={student.SNAME}
                                            email={student.EMAIL}
                                            img={student._IMAGE} />
                                    </th>
                                    <td>{join_date}</td>
                                    <td>{student.ABOUT}</td>
                                    <td>{student.SCORE}</td>
                                    <td className={isAdmin ? styles.admin : ''}>
                                        {isAdmin ? 'admin' : 'student'}
                                    </td>
                                </tr>
                            )
                        })

                    )} />
            </tbody>
        </table >
    )
}
