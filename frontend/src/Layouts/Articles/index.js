import React from 'react'
import InstructorProtectedComponent from '../../components/InstructorProtectedComponent'

import { NavLink } from 'react-router-dom'

export default function Articles() {

  return (
    <section>
      <h2>Articles</h2>
      <InstructorProtectedComponent
        render={
          <NavLink to='add' ><button>Add Article</button></NavLink>
        }

        replace={<></>}
      />
    </section>
  )
}
