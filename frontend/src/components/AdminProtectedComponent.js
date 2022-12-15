import React from 'react'
import useToken from '../useToken'

export default function AdminProtectedComponent({ render, replace }) {
    const { isAdmin } = useToken()
    return isAdmin ? render : replace
}
