const api = {
    login: 'http://localhost:4000/auth/login',
    signup: 'http://localhost:4000/auth/register',
    logout: '',
    deleteMe: 'http://localhost:4000/users/delete/me',
    deleteTopic: () => 'http://localhost:4000/users/delete/me',
    getStudents: 'http://localhost:4000/students',
    getInstructors: 'http://localhost:4000/instructors',
    getTopics: 'http://localhost:4000/topics',
    editProfile: (username) => `http://localhost:4000/users/${username}/edit`,
    editTopic: (id) => `http://localhost:4000/topics/editTopic/${id}`,
    user: (id) => `http://localhost:4000/users/${id}`,
    student: (id) => `http://localhost:4000/students/${id}`,
    addTopic: 'http://localhost:4000/topics/newTopic'
}
export default api