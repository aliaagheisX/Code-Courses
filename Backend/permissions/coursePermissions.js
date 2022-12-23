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
			let course = null;
			try {
				course = await courseRepo.getCourseById(c_id);
			} catch (err) {
				return res
					.status(500)
					.send({ message: "Internal server error getting course by id " + err });
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
	canEditReview: async (req, res, next) => {
		let u_id = parseInt(req.params.u_id);
		let userID = req.user.ID;
		if (u_id === userID) {
			next();
		}
		return res
			.status(401)
			.send({ message: "Unauthorized. This isn't your review" });
	},
	canReview: async (req, res, next) => {
		let u_id = req.user.ID;
		let c_id = parseInt(req.params.c_id);
		let is_enrolled = null;
		try {
			is_enrolled = await courseRepo.getUserEnrolled(u_id, c_id);
		} catch(err) {
			return res
				.status(500)
				.send({ message: "Internal server error getting user enrolled " + err });
		}
		if (!is_enrolled) {
			return res
				.status(401)
				.send({ message: "Unauthorized. You are not enrolled in this course" });
		}
		next();
	}
}