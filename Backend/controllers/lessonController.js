const articleRepo = require('../repositories/articleRepository');
const lessonRepo = require('../repositories/lessonRepository');
const Joi = require('joi');

function lessonValidate(lesson) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(32).required(),
        description: Joi.string().min(1).max(256).required(),
        cid: Joi.number().required(),
        qid: Joi.number().min(1).required(),
        aid: Joi.number().min(1).required(),
    });
    return schema.validate(lesson);
}

function patchLessonValidate(lesson) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(32).allow('', null),
        description: Joi.string().min(1).max(256).allow('', null),
        cid: Joi.number().allow('', null),
        qid: Joi.number().min(1).allow('', null),
        aid: Joi.number().min(1).allow('', null),
    });
    return schema.validate(lesson);
}

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
            return res
                .status(200)
                .send({
                    lesson: lesson,
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
            return res
                .status(200).send({ lessons: lessons });
        } catch (err) {
            return res
                .status(500)
                .send({ message: "Internal server error getting lessons by course " + err });
        }
    },
    postNewLesson: async (req, res) => {
        try {
            let lesson = req.body;
            const { error } = lessonValidate(lesson);
            if (error) {
                return res
                    .status(403)
                    .send({ message: "Validation error " + error.details[0].message });
            }
            let { id, newLesson } = await lessonRepo.postNewLesson(lesson);
            return res
                .status(201)
                .send({
                    message: "Lesson added successfully",
                    id: id,
                    lesson: newLesson,
                });
        } catch (err) {
            return res
                .status(500)
                .send({ message: "Internal server error creating new lesson " + err });
        }
    },
    editLesson: async (req, res) => {
        try {
            let columns = req.body;
            let cid = null;
            if (columns["cid"] !== null && columns["cid"] !== "") {
                cid = parseInt(columns["cid"]);
            }
            let l_id = parseInt(req.params.l_id);
            const { error } = patchLessonValidate(columns);
            if (error) {
                return res
                    .status(403)
                    .send({ message: "Validation error " + error.details[0].message });
            }
            if (columns["name"] !== null && columns["name"] !== "") {
                await lessonRepo.editLessonName(columns["name"], l_id);
            }
            if (columns["description"] !== null && columns["description"] !== "") {
                await lessonRepo.editLessonDescription(columns["description"], l_id);
            }
            if (columns["qid"] !== null && columns["qid"] !== "") {
                await lessonRepo.editLessonQuestion(columns["qid"], l_id);
            }
            if (columns["aid"] !== null && columns["aid"] !== "") {
                await lessonRepo.editLessonArticle(columns["aid"], l_id);
            }
            if (cid !== null) {
                await lessonRepo.editLessonCourseId(cid, l_id);
            }
            let newLesson = await lessonRepo.getLessonById(l_id);
            return res
                .status(200)
                .send({
                    message: "Lesson edited successfully",
                    lesson: newLesson,
                });
        } catch (err) {
            return res
                .status(500)
                .send({ message: "Internal server error editing lesson " + err });
        }
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