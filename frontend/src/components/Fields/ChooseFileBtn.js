import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
export default function ChooseFileBtn({ isLoading, name, mode }) {
    if (mode === undefined)
        mode = 'normal'

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

    const StyleContBtn = {
        background: "#95B2EA",
        fontSize: "1.2rem",
        padding: "0.6rem",
        border: "0",
        color: "#fff",
        margin: "1rem 0",
        borderRadius: "6px",
        cursor: 'pointer',
        display: 'block'
    }
    return (
        <label style={mode === 'normal' ? StyleCont : StyleContBtn} htmlFor={name}>
            {isLoading ?
                <Spinner animation="border" variant="light" size="sm" /> :
                mode === 'normal' ?
                    <span className="material-symbols-outlined" style={{ fontSize: '15px', color: 'white', textAlign: 'center' }}>
                        edit
                    </span> :
                    "upload"
            }
        </label>
    )
}
