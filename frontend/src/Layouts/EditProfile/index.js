import React from 'react'
import ChangePassword from '../../components/Forms/ChangePassword'
import DeletMe from '../../components/Forms/DeletMe'
import EditeProfileForm from '../../components/Forms/EditeProfileForm'

import styles from './index.module.css'

export default function EditProfile() {
    return (
        <section className={styles.cont}>
            <div className={styles.mnForm}>
                <h3>Edit Profile</h3>
                <EditeProfileForm />
            </div>
            <div>
                <section className={styles.mnForm}>
                    <h3>Change Password</h3>
                    <ChangePassword />
                </section>
                <section className={styles.danger}>
                    <DeletMe />
                </section>
            </div>
        </section>
    )
}
