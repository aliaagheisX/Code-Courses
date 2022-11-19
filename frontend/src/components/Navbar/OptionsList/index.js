import React from 'react'
import AuthForms from './AuthForms'
import ProfileLinks from './ProfileLinks'
import useToken from '../../../useToken'

export default function OptionsList() {
  const { token } = useToken()
  return (
    <>
      {token ? <ProfileLinks /> : <AuthForms />}

    </>
  )
}
