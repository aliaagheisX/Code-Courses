import React from 'react'
import UserSummary from '../../../components/UserSummary'
import styles from './index.module.css'
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
                <tr>
                    <th scope="row">
                        <UserSummary fname='joe' lname='doe' email='joedoe@g.com' img='/15-08.jpg' />
                    </th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
        </table >
    )
}
