import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './index.css';
import App from './App';
import StudentProfile from './Layouts/StudentProfile'
import 'bootstrap/dist/css/bootstrap.min.css';
import useToken from './useToken';
import EditProfile from './Layouts/EditProfile';
import Users from './Layouts/Users/Users';
import Students from './Layouts/Users/Students/Students';

const ProtectedRoute = ({ children }) => {
  const { token } = useToken();
  if (!token) return <Navigate to={'/'} replace />
  return children;
}

const AdminRoute = ({ children }) => {
  const { token, isAdmin } = useToken();
  if (!token) return <Navigate to={'/'} replace />
  if (!isAdmin) return <Navigate to={'/'} replace />
  return children;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>

        <Route path='/students/:id' element={<StudentProfile />} />

        <Route path='/users' element={<Users />} >
          <Route path='students' element={<Students />} />
          <Route path='instructors' element={<Students />} />
          <Route path='admins' element={<Students />} />
        </Route>


        <Route path='edit/me' element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        } />


      </Route>
    </Routes>
  </BrowserRouter>
); 