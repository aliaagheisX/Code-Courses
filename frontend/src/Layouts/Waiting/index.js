import React from 'react'

export default function Waiting() {
    return (
        <img src={require('./loader.gif')} alt='loader' style={{ margin: 'auto', display: 'block' }} />
    )
}
