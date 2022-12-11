import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import styles from './index.module.css'

export default function Tags({ value, isActive, to }) {
    const [active, setActive] = useState(isActive);

    return (
        <NavLink to={to}
            onClick={() => setActive(!active)}
            className={`${styles.tag}  ${active ? styles.active : ''}`}>
            <span>{active ? '✔' : '+'}</span> {value}
        </NavLink>
    )
}
