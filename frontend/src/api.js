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
    getAdmins: 'http://localhost:4000/users/admins/getadmins',
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
    getCoursesOfStudent: (s_id) => `http://localhost:4000/courses/getcoursesofstudent/${s_id}`,
    addCourse: `http://localhost:4000/courses/create`,
    deleteCourse: (id) => `http://localhost:4000/courses/${id}`,
    editCourse: (id) => `http://localhost:4000/courses/${id}`,
    enrollCourse: (id) => `http://localhost:4000/courses/enroll/${id}`,
    disenrollCourse: (id) => `http://localhost:4000/courses/disenroll/${id}`,
    editReview: (c_id, u_id) => `http://localhost:4000/courses/review/edit/${c_id}/${u_id}`,
    deleteReview: (c_id, u_id) => `http://localhost:4000/courses/deleteonereview/${c_id}/${u_id}`,
    deleteAllReviews: (c_id) => `http://localhost:4000/courses/deletecoursereviews/${c_id}`, //admin
    getInstructorCourses: (i_id) => `http://localhost:4000/courses/instructors/${i_id}`,
    getInstructorQuizzes: (i_id) => `http://localhost:4000/quizzes/getByInstructor/${i_id}`,
    addLesson: `http://localhost:4000/lessons/newlesson`,
    editLesson: (l_id) => `http://localhost:4000/lessons/editlesson/${l_id}`,
    deleteLesson: (l_id) => `http://localhost:4000/lessons/deletelessonbyid/${l_id}`,
    getCourseLessons: (c_id) => `http://localhost:4000/lessons/getlessonsbycourse/${c_id}`,
    getLesson: (l_id) => `http://localhost:4000/lessons/getlessonbyid/${l_id}`,
    getDiscussion: (c_id) => `http://localhost:4000/discussions/getcoursediscussion/${c_id}`,


    addQuestion: `http://localhost:4000/questions/create`,
}
export default api