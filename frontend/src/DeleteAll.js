import React from 'react'
import useToken from './useToken'
import { useNavigate } from 'react-router-dom'

export default function DeleteAll({ path, afterDelete, txt, isNavigate, where }) {
    if (isNavigate === undefined) isNavigate = 1
    if (where === undefined) where = '/user'

    const navigate = useNavigate()
    const { token } = useToken()
    const handelDelete = async () => {
        try {
            const res = await fetch(path, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'token': token },
            })

            const data = res.json()

            if (!res.ok) throw data.message;

            afterDelete()
            if (isNavigate)
                navigate(where);

        } catch (err) {
            console.log("err", err)
        }
    }
    return (
        <button className='btnDanger' onClick={handelDelete}>{txt}</button>
    )
}
