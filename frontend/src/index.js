import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './index.css';
import App from './App';
import Profile from './Layouts/Profile'
import 'bootstrap/dist/css/bootstrap.min.css';
import useToken from './useToken';
import EditProfile from './Layouts/EditProfile';

const ProtectedRoute = ({ children }) => {
  const { token } = useToken();
  if (!token) return <Navigate to={'/'} replace />
  return children;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>

        <Route path='me' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
        />

        <Route path='edit/me' element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
        />

      </Route>
    </Routes>
  </BrowserRouter>
); 