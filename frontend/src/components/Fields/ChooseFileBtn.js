import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
export default function ChooseFileBtn({ isLoading, name }) {
    const StyleCont = {
        width: '25px',
        height: '25px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#95B2EA',
        borderRadius: '50%',
        marginLeft: '-12px',
        marginBottom: '-9px',
        cursor: 'pointer'
    }
    return (
        <label style={StyleCont} htmlFor={name}>
            {isLoading ?
                <Spinner animation="border" variant="light" size="sm" /> :
                <span className="material-symbols-outlined" style={{ fontSize: '15px', color: 'white', textAlign: 'center' }}>
                    edit
                </span>
            }
        </label>
    )
}
