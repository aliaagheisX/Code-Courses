import React from 'react'

export default function Thumb({ avatar }) {
    return (
        <div className='thum-wrapper' style={{ background: `url(${avatar})`, width: '840px', height: '240px', backgroundSize: 'cover' }}>
        </div>
    )
}
