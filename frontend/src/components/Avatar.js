import React from 'react'

export default function Avatar({ avatar }) {
    const styles = {
        borderRadius: '50%',
        //border: '5px solid #383848',
        boxShadow: '0px 0px 6px 3px rgba(149, 178, 234, 0.58)'
    }
    return (
        <img src={avatar} width='70px' style={styles} alt='avatar' />
    )
}
