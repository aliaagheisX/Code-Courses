import React from 'react'

export default function Thumb({ avatar }) {
    return (
        <div className='thum-wrapper' style={{ backgroundImage: `url(${avatar})` }}>
        </div>
    )
}
