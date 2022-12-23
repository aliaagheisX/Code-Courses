import { useState } from 'react';
import api from './api';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');

        return tokenString || ''
    };
    const getUserdata = () => {
        const data = localStorage.getItem('userdata');
        return data ? JSON.parse(data) : {}
    };

    const getIsAdmin = () => {
        const data = localStorage.getItem('isAdmin');
        return data ? JSON.parse(data) : {}
    };

    const getIsInstructor = () => {
        const data = localStorage.getItem('isInstructor');
        return data ? JSON.parse(data) : {}
    };



    const [token, setToken] = useState(getToken());
    const [userdata, setUserdata] = useState(getUserdata());
    const [isAdmin, setIsAdmin] = useState(getIsAdmin());
    const [isInstructor, setIsInstructor] = useState(getIsInstructor());

    const saveIsInstructor = async (user) => {
        const res = await fetch(api.instructor(user.ID))
        if (res.ok) {
            localStorage.setItem('isInstructor', 1);
            setIsInstructor(1)
        }
        else {
            localStorage.setItem('isInstructor', 0);
            setIsInstructor(0)
        }
    }

    const setInstructor = (isInstructor) => {
        localStorage.setItem('isInstructor', isInstructor);
        setIsInstructor(isInstructor)
    }


    const saveToken = userdata => {
        try {
            const { token, user } = userdata
            localStorage.setItem('token', token);
            localStorage.setItem('userdata', JSON.stringify(user));
            localStorage.setItem('isAdmin', JSON.stringify(user.ISADMIN.data[0]));
            setToken(user.token);
            setUserdata(user)
            setIsAdmin(user.ISADMIN.data[0])
            saveIsInstructor(user)
        }
        catch (err) {
            localStorage.clear();
            setToken();
            setUserdata();
            setIsAdmin(0);
            window.location.href = '/';
        }
    };

    return {
        setToken: saveToken,
        token,
        userdata,
        isAdmin,
        isInstructor,
        setInstructor
    }
}