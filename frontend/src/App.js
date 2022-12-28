import React from 'react'
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import SideNav from './components/SideNav/SideNav';
export default function App() {
    return (
        <>
            <Navbar />
            <div style={{ display: 'flex' }}>
                <SideNav />
                <div style={{ margin: "0 auto", width: "85%", minWidth: "250px", padding: "4rem 0" }}>
                    <Outlet />
                </div>


            </div>
        </>
    )
}
