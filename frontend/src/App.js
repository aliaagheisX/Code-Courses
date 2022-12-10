import React from 'react'
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import SideNav from './components/SideNav/SideNav';
import ImgField from './components/Fields/ImgField';

import Avatar from './components/Avatar';
import ChooseFileBtn from './components/Fields/ChooseFileBtn';
import EditeProfileForm from './components/Forms/EditeProfileForm';
export default function App() {
    return (
        <>
            <Navbar />
            <div style={{ display: 'flex' }}>
                <SideNav />
                <div style={{ margin: "0 auto", width: "85%", minWidth: "250px", padding: "4rem 0" }}>
                    <EditeProfileForm />
                    <Outlet />
                </div>
            </div>
        </>
    )
}
