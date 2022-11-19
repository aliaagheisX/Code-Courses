import React from 'react'
import Logo from '../Logo'
import styles from './index.module.css'

import OptionsList from './OptionsList'

export default function Navbar() {
  return (
    <nav className={styles.wrapper}>

      <Logo />

      <OptionsList />

    </nav>
  )
}
