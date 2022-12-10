import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');

        return tokenString || ''
    };
    const getUserdata = () => {
        const data = localStorage.getItem('userdata');
        return data ? JSON.parse(data) : {}
    };

    const [token, setToken] = useState(getToken());
    const [userdata, setUserdata] = useState(getUserdata());

    const saveToken = userdata => {
        const { token, user } = userdata
        localStorage.setItem('token', token);
        localStorage.setItem('userdata', JSON.stringify(user));
        setToken(user.token);
        setUserdata(user)
    };

    return {
        setToken: saveToken,
        token,
        userdata
    }
}