import React from 'react'

export default function Avatar({ avatar }) {
    const styles = {
        borderRadius: '50%',
        //border: '5px solid #383848',
    }
    return (
        <img src={avatar} width='70px' height='70px' style={styles} alt='avatar' />
    )
}
