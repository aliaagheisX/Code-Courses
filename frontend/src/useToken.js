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

    const getIsAdmin = () => {
        const data = localStorage.getItem('isAdmin');
        return data ? JSON.parse(data) : {}
    };

    const [token, setToken] = useState(getToken());
    const [userdata, setUserdata] = useState(getUserdata());
    const [isAdmin, setIsAdmin] = useState(getIsAdmin());

    const saveToken = userdata => {
        try {
            const { token, user } = userdata
            localStorage.setItem('token', token);
            localStorage.setItem('userdata', JSON.stringify(user));
            localStorage.setItem('isAdmin', JSON.stringify(user.ISADMIN.data[0]));
            setToken(user.token);
            setUserdata(user)
            setIsAdmin(user.ISADMIN.data[0])
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
        isAdmin
    }
}