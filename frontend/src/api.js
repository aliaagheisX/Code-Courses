const api = {
    login: 'http://localhost:4000/auth/login',
    signup: 'http://localhost:4000/auth/register',
    logout: '',
    user: (id) => `http://localhost:4000/users/${id}`,
    student: (id) => `http://localhost:4000/students/${id}`,
    deleteMe: 'http://localhost:4000/users/delete/me',
    delteUser: (id) => `http://localhost:4000/users/deletebyid/${id}`,
    editProfile: (username) => `http://localhost:4000/users/${username}/edit`,
    addAdmin: (id) => `http://localhost:4000/auth/addadmin/${id}`,
    instructor: (id) => `http://localhost:4000/instructors/${id}`,
    addInstructor: `http://localhost:4000/instructors/newInstructor`,
    deleteInstructor: (id) => `http://localhost:4000/instructors/delete/${id}`,
    deleteAllInstrunctors: `http://localhost:4000/instructors/delete_all`,
    getStudents: 'http://localhost:4000/students',
    getInstructors: 'http://localhost:4000/instructors',
    getTopics: 'http://localhost:4000/topics',
    editTopic: (id) => `http://localhost:4000/topics/editTopic/${id}`,
    addTopic: 'http://localhost:4000/topics/newTopic',
    getArticle: (id) => `http://localhost:4000/articles/getbyarticleid/${id}`,
    getArticleTopics: (id) => `http://localhost:4000/articles/getarticletopics/${id}`,
    getArticles: 'http://localhost:4000/articles',
    addArticle: 'http://localhost:4000/articles/create',
    getInstructorArticles: (id) => `http://localhost:4000/articles/getinstructorarticles/${id}`,
    addArticleTopics: (id) => `http://localhost:4000/articles/editarticletopics/${id}`,
    editArticleTopics: (id) => `http://localhost:4000/articles/editarticletopics/${id}`,
    editArticle: (id) => `http://localhost:4000/articles/edit/${id}`,
    deleteArticle: (id) => `http://localhost:4000/articles/${id}`,
    userReadArticle: (id) => `http://localhost:4000/articles/readarticle/${id}`,
    userLikeArticle: (id) => `http://localhost:4000/articles/likearticle/${id}`,
    getArticlComments: (id) => `http://localhost:4000/comments/articles/${id}`,
    addArticlComments: (id) => `http://localhost:4000/comments/create/${id}`,//article_id
    editeComment: (id) => `http://localhost:4000/comments/edit/${id}`,//comment_id
    deleteComment: (id) => `http://localhost:4000/comments/${id}`,//comment_id

    getCourse: (id) => `http://localhost:4000/courses/${id}`,
    getAllCourses: `http://localhost:4000/courses/`,
    addCourse: `http://localhost:4000/courses/create`,
    deleteCourse: (id) => `http://localhost:4000/courses/${id}`,
    enrollCourse: (id) => `http://localhost:4000/courses/enroll/${id}`,
    disenrollCourse: (id) => `http://localhost:4000/courses/disenroll/${id}`

}
export default api