const articleRepo = require('../repositories/articleRepository');
const lessonRepo = require('../repositories/lessonRepository');

module.exports = {
    getAllLessons: async (req, res) => {
        try {
            let lessons = await lessonRepo.getAllLessons();
            if (!lessons.length) {
                return res
                    .status(404)
                    .send({ message: "No lessons found" });
            }
            let articles = [];
            for (let lesson of lessons) {
                let article = await articleRepo.getArticlesByLesson(lesson.LID);
                for (let a of article) {
                    articles.push(a);
                }
            }
            return res
                .status(200)
                .send({ 
                    lessons: lessons,
                    articles: articles,
                });
        } catch (err) {
            return res
                .status(500)
                .send({ message: "Internal server error getting all lessons " + err });
        }
    },
    getLessonById: async (req, res) => {
        try {
            let l_id = req.params.l_id;
            let lesson = await lessonRepo.getLessonById(l_id);
            if (!lesson) {
                return res
                    .status(404)
                    .send({ message: "Lesson not found" });
            }
            let articles = await articleRepo.getArticlesByLesson(lesson.LID);
            return res
                .status(200)
                .send({
                    lesson: lesson,
                    articles: articles,
                });
        } catch (err) {
            return res
                .status(500)
                .send({ message: "Internal server error getting lesson by id " + err });
        }
    },
    getLessonsByCourse: async (req, res) => {
        try {
            let c_id = req.params.c_id;
            let lessons = await lessonRepo.getLessonsByCourse(c_id);
            if (!lessons.length) {
                return res
                    .status(404)
                    .send({ message: "No lessons for this course" });
            }
            let articles = [];
            for (let lesson of lessons) {
                let articleList = await articleRepo.getArticlesByLesson(lesson.LID);
                for (let article of articleList) {
                    articles.push(article);
                }
            }
            return res
                .status(200)
                .send({ 
                    lessons: lessons,
                    articles: articles,
                });
        } catch (err) {
            return res
                .status(500)
                .send({ message: "Internal server error getting lessons by course " + err });
        }
    },
    postNewLesson: async (req, res) => {

    },
    editLesson: async (req, res) => {

    },
    deleteAllLessons: async (req, res) => {
        try {
            let response = await lessonRepo.deleteAllLessons();
            if (!response.affectedRows) {
                return res
                    .status(404)
                    .send({ message: "No lessons to delete" });
            }
            return res
                .status(200)
                .send({ message: "All lessons deleted successfully" });
        } catch (err) {
            return res
                .status(500)
                .send({ message: "Internal server error deleting all lessons " + err });
        }
    },
    deleteLessonById: async (req, res) => {
        try {
            let l_id = req.params.l_id;
            let response = await lessonRepo.deleteLessonById(l_id);
            if (!response.affectedRows) {
                return res
                    .status(404)
                    .send({ message: "Lesson not found" });
            }
            return res
                .status(200)
                .send({ message: "Lesson deleted successfully" });
        } catch (err) {
            return res
                .status(500)
                .send({ message: "Internal server error deleting lesson by id " + err });
        }
    },
};