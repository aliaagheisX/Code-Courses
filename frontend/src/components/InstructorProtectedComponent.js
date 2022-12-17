import React from 'react'
import useToken from '../useToken'

export default function InstructorProtectedComponent({ render, replace }) {
    const { isInstructor, token } = useToken()
    return token && isInstructor ? render : replace
}
