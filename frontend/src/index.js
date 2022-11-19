import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import App from './App';
import Profile from './routes/Profile'
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path='student/:id' element={<Profile />} />
      </Route>
    </Routes>
  </BrowserRouter>
); 