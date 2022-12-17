import React, { useState } from 'react'
import AdminProtectedComponent from '../../AdminProtectedComponent'
import api from '../../../api'
import useToken from '../../../useToken'
import Spinner from 'react-bootstrap/Spinner';

export default function AdminBtns({ id }) {
    const { token, userdata } = useToken()
    const [isLoadingS, setIsLoadingS] = useState(0)
    const [isLoadingD, setIsLoadingD] = useState(0)

    const AddAdmin = async () => {
        setIsLoadingS(1)
        try {
            const res = await fetch(api.addAdmin(id), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'token': token }
            })
            const data = await res.json()
            if (!res.ok) throw data.message

            console.log("succuss", data)
            setIsLoadingS(0)
        } catch (err) {
            console.log("error", err)
            setIsLoadingS(0)
        }
    }

    const DeleteUser = async () => {
        setIsLoadingD(1)
        try {
            const res = await fetch(api.delteUser(id), {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'token': token }
            })
            const data = await res.json()
            setIsLoadingD(0)

            if (!res.ok)
                throw data.message

            if (userdata.ID === id) {
                localStorage.clear();
                window.location.href = '/';
            }
            else {
                window.location.reload()
            }
        }
        catch (err) {
            console.log("error", err)
        }
    }

    return (
        <AdminProtectedComponent
            render={
                <div className='btnIconList'>
                    <div className='btnIcon success' onClick={AddAdmin}>
                        {isLoadingS ?
                            <Spinner animation="border" variant="light" size="sm" /> :
                            <span className="material-symbols-outlined">
                                add
                            </span>
                        }
                    </div>

                    <div className='btnIcon danger' onClick={DeleteUser}>
                        {isLoadingD ?
                            <Spinner animation="border" variant="light" size="sm" /> :
                            <span className="material-symbols-outlined">
                                close
                            </span>
                        }
                    </div>
                </div>
            }
            replace={<></>}
        />
    )
}
