import React from 'react'
import Avatar from '../Avatar'
export default function UserSummary({ fname, lname, img, email }) {
    return (
        <div>
            <Avatar avatar={img} />
            <span>{fname} {lname}</span>
            <span>{email}</span>
        </div>
    )
}
