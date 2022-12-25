import Button from 'react-bootstrap/Button';
import React from 'react';
import styles from './styles/index.module.css'
export default function ButtonExpand({ id, setOpen, open }) {

    return (
        <>
            <Button
                onClick={() => setOpen(!open)}
                aria-controls={`description${id}`}
                aria-expanded={open}
                className={styles.expand}
            >
                <span className="material-symbols-outlined">
                    {open ? 'expand_less' : 'expand_more'}
                </span>
            </Button>
        </>
    )
}
