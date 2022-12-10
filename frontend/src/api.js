const api = {
    login: 'http://localhost:4000/auth/login',
    signup: 'http://localhost:4000/auth/register',
    logout: '',
    editProfile: (username) => `http://localhost:4000/users/${username}/edit`,

    me: (id) => `http://localhost:5000/students/${id}`
}
export default api