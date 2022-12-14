const api = {
    login: 'http://localhost:4000/auth/login',
    signup: 'http://localhost:4000/auth/register',
    logout: '',
    deleteMe: 'http://localhost:4000/users/delete/me',
    getStudents: 'http://localhost:4000/students',
    editProfile: (username) => `http://localhost:4000/users/${username}/edit`,
    user: (id) => `http://localhost:4000/users/${id}`,
    student: (id) => `http://localhost:4000/students/${id}`,
}
export default api