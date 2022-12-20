const lessonRepo = require('../repositories/lessonRepository');
const courseRepo = require('../repositories/courseRepository');

module.exports = {
    canEditLesson: async (req, res, next) => {
        let id = req.user.ID;
		let l_id = req.params.l_id;
		if (isInstructor(id)) {
			let lesson = await lessonRepo.getLessonById(l_id);
            let course = await courseRepo.getCourseById(lesson.CID);
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
    }
}