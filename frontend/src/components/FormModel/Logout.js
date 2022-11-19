import React, { useEffect } from 'react'
import api from '../../api'

export default function Logout() {
    useEffect(() => {
        localStorage.clear();
        window.location.href = '/';
    }, [])
    return (
        <div>Logout</div>
    )
}
