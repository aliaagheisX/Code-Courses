import React from 'react'
import SideNav from '../../components/SideNav'
import Profile from '../../components/Profile'
import ProfileCharts from '../../components/ProfileCharts'

import styles from './index.module.css'
export default function index() {
    return (
        <section className={styles.body} >

            <SideNav />
            <main>
                <Profile />
                <ProfileCharts />
            </main>
        </section>

    )
}
