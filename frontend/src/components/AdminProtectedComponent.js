import React from 'react'
import useToken from '../useToken'

export default function AdminProtectedComponent({ render, replace }) {
    const { isAdmin, token } = useToken()
    return token && isAdmin ? render : replace
}
