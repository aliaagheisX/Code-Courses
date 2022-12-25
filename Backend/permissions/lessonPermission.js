const lessonRepo = require('../repositories/lessonRepository');
const courseRepo = require('../repositories/courseRepository');
const articleRepo = require('../repositories/articleRepository');
const quizRepo = require('../repositories/quizRepository');
const { isInstructor } = require('../helpers/instructorHelper');

module.exports = {
	canEditLesson: async (req, res, next) => {
		let id = req.user.ID;
		let l_id = req.params.l_id;
		if (isInstructor(id)) {
			let lesson = null;
			let course = null;
			try {
				lesson = await lessonRepo.getLessonById(l_id);
				course = await courseRepo.getCourseById(lesson.CID);
			} catch (err) {
				return res
					.status(500)
					.send({ message: "Internal server error getting lesson and course " + err });
			}
			if (course.INSTRUCTORID === id) {
				next();
			} else {
				return res
					.status(401)
					.send({ message: "Unauthorized. Must be the instructor of the course" });
			}
		} else {
			return res
				.status(401)
				.send({ message: "Unauthorized. Must be instructor" })
		}
	},

	canCreateLesson: async (req, res, next) => {
		let id = req.user.ID;
		let c_id = req.body.cid;
		let a_id = req.body.aid;
		let q_id = req.body.qid;
		let course = null;
		try {
			course = await courseRepo.getCourseById(c_id);
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error getting course by id " + err });
		}

		if (isInstructor(id)) {

			if (course.INSTRUCTORID === id) {
				const article = await articleRepo.getArticleById(a_id)
				//const quiz = await quizRepo.g
				if (article.INSTRUCTORID !== id) {
					return res
						.status(401)
						.send({ message: "Unauthorized. Must be the author of the article" });
				}
				else {
					next();
				}
			} else {
				return res
					.status(401)
					.send({ message: "Unauthorized. Must be the instructor of the course" });
			}
		} else {
			return res
				.status(401)
				.send({ message: "Unauthorized. Must be instructor or admin" })
		}
	},
}