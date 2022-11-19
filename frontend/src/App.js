import React from 'react'
import useToken from './useToken';
import Home from './routes/Home';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

export default function App() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}
