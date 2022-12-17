const api = {
    login: 'http://localhost:4000/auth/login',
    signup: 'http://localhost:4000/auth/register',
    logout: '',
    student: (id) => `http://localhost:4000/students/${id}`,
    user: (id) => `http://localhost:4000/users/${id}`,
    instructor: (id) => `http://localhost:4000/instructors/${id}`,
    deleteMe: 'http://localhost:4000/users/delete/me',
    delteUser: (id) => `http://localhost:4000/users/deletebyid/${id}`,
    editProfile: (username) => `http://localhost:4000/users/${username}/edit`,

    getStudents: 'http://localhost:4000/students',
    getInstructors: 'http://localhost:4000/instructors',

    getTopics: 'http://localhost:4000/topics',
    editTopic: (id) => `http://localhost:4000/topics/editTopic/${id}`,
    addTopic: 'http://localhost:4000/topics/newTopic',

    getArticle: (id) => `http://localhost:4000/articles/getbyarticleid/${id}`,
    getArticleTopics: (id) => `http://localhost:4000/articles/getarticletopics/${id}`,
    getArticles: 'http://localhost:4000/articles',
    addArticle: 'http://localhost:4000/articles/create',
    addArticleTopics: (id) => `http://localhost:4000/articles/editarticletopics/${id}`,
    editArticleTopics: (id) => `http://localhost:4000/articles/editarticletopics/${id}`,
    editArticle: (id) => `http://localhost:4000/articles/edit/${id}`,

}
export default api