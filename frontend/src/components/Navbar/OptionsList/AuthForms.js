import React, { useState } from 'react'
import styles from './styles/index.module.css'


import FormModel from '../../FormModel';

export default function AuthForms() {
    const [loginModal, setLoginModal] = useState(false);
    const [signModal, setSignModal] = useState(false);

    return (
        <>
            <ul className={styles.optionsList}>
                <li onClick={() => setSignModal(true)}>Sign up</li>
                <li onClick={() => setLoginModal(true)}>Login</li>
            </ul>

            <FormModel
                show={loginModal}
                onHide={() => setLoginModal(false)}
                type='login'
            />


            <FormModel
                show={signModal}
                onHide={() => setSignModal(false)}
                type='signup'
            />
        </>
    )
}
