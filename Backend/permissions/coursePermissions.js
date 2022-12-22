const { isInstructor } = require('../helpers/instructorHelper');
const instructorRepo = require('../repositories/instructorRepo');
const courseRepo = require('../repositories/courseRepository');

module.exports = {
	canCreateCourse: async (req, res, next) => {
		let id = req.user.ID;
		if (isInstructor(id)) {
			next();
		} else {
			return res
				.status(401)
				.send({ message: "Unauthorized. Must be instructor" });
		}
	},
	canEditCourse: async (req, res, next) => {
		let id = req.user.ID;
		let c_id = req.params.c_id;
		if (isInstructor(id)) {
			let course = await courseRepo.getCourseById(c_id);
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
}