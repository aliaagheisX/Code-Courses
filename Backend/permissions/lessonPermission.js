const lessonRepo = require('../repositories/lessonRepository');
const courseRepo = require('../repositories/courseRepository');

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
    }
}