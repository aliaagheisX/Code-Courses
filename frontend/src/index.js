import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './index.css';
import App from './App';
import StudentProfile from './Layouts/StudentProfile'
import InstructorProfile from './Layouts/InstructorProfile'
import 'bootstrap/dist/css/bootstrap.min.css';
import useToken from './useToken';
import EditProfile from './Layouts/EditProfile';
import Users from './Layouts/Users/Users';
import Students from './Layouts/Users/Students';
import Instructors from './Layouts/Users/Instructors';
import Admins from './Layouts/Users/Admins';
import Articles from './Layouts/Articles';
import AddArticle from './Layouts/Articles/AddArticle';
import AddCourse from './Layouts/Courses/AddCourse';
import EditCourse from './Layouts/Courses/EditCourse';
import ShowArticle from './Layouts/Articles/ShowArticle';
import ShowCourse from './Layouts/Courses/ShowCourse';
import Topics from './Layouts/Topics';
import EditeArticle from './Layouts/Articles/EditeArticle';
import Courses from './Layouts/Courses';
import Home from './Layouts/Homepage/Home';
import AddLesson from './Layouts/Lessons/AddLesson';
import EditLesson from './Layouts/Lessons/EditLesson';
import Discussion from './components/Discussion';
import AddQuestion from './Layouts/Questions/AddQuestion';
import Questions from './Layouts/Questions';

const ProtectedRoute = ({ children }) => {
  const { token } = useToken();
  if (!token) return <Navigate to={'/'} replace />
  return children;
}

const AdminRoute = ({ children }) => {
  const { token, isAdmin } = useToken();
  if (!token || !isAdmin) return <Navigate to={'/'} replace />
  return children;
}
const InstructorRoute = ({ children }) => {
  const { token, isInstructor } = useToken();
  if (!token || !isInstructor) return <Navigate to={'/'} replace />
  return children;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path='/' element={<Home />} />

        <Route path='/students/:id' element={<StudentProfile />} />
        <Route path='/instructors/:id' element={<InstructorProfile />} />

        <Route path='/users' element={<Users />} >
          <Route path='' element={<Students />} />
          <Route path='students' element={<Students />} />
          <Route path='instructors' element={<Instructors />} />
          <Route path='admins' element={<Admins />} />
        </Route>
        <Route path='edit/me' element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        } />

        <Route path='/Topics' element={
          <AdminRoute >
            <Topics />
          </AdminRoute>} />


        <Route path='/articles/add' element={
          <InstructorRoute>
            <AddArticle />
          </InstructorRoute>
        } />
        <Route path='/articles/edite/:id' element={
          <InstructorRoute>
            <EditeArticle />
          </InstructorRoute>
        } />
        <Route path='/articles/:id' element={<ShowArticle />} />
        <Route path='/articles' element={<Articles />} />





        <Route path='/courses' element={<Courses />} />
        <Route path='/courses/:id' element={<ShowCourse />} />
        <Route path='/courses/edit/:id' element={<EditCourse />} />
        <Route path='/courses/add' element={
          <InstructorRoute>
            <AddCourse />
          </InstructorRoute>
        } />

        <Route path='/lessons/add' element={
          <InstructorRoute>
            <AddLesson />
          </InstructorRoute>
        } />

        <Route path='/lessons/add/:id' element={
          <InstructorRoute>
            <AddLesson />
          </InstructorRoute>
        } />
        <Route path='/lessons/edit/:id' element={
          <InstructorRoute>
            <EditLesson />
          </InstructorRoute>
        } />


        <Route path='/discussions' element={
          <ProtectedRoute>
            <Discussion />
          </ProtectedRoute>
        } />

        <Route path='/questions' element={
          <InstructorRoute>
            <Questions />
          </InstructorRoute>
        } />

        <Route path='/questions/add' element={
          <InstructorRoute>
            <AddQuestion />
          </InstructorRoute>
        } />

      </Route>
    </Routes>
  </BrowserRouter>
); 