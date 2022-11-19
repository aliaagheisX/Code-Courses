import React from 'react'
import Spinner from 'react-bootstrap/Spinner';


export default function SubmitButton({ text, isSubmitting }) {
    return (
        <button type="submit" disabled={isSubmitting}>
            {isSubmitting ?
                <Spinner animation="border" variant="light" size="sm" /> :
                <span>{text}</span>
            }
        </button>
    )
}
