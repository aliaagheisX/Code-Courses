import React from 'react'
import useToken from '../useToken'

export default function InstructorProtectedComponent({ render, replace }) {
    const { isInstructor } = useToken()
    return isInstructor ? render : replace
}
