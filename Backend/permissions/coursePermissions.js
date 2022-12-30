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
	canControllCourse: async (req, res, next) => {
		let id = req.user.ID;
		let c_id = req.params.c_id;
		let course = null;
		try {
			course = await courseRepo.getCourseById(c_id);
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error getting course by id " + err });
		}

		if (req.user.ISADMIN[0]) {	//if admin
			next();
		}
		else if (isInstructor(id)) {

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
				.send({ message: "Unauthorized. Must be instructor or admin" })
		}
	},


	canEditReview: async (req, res, next) => {
		let u_id = parseInt(req.params.u_id);
		let userID = req.user.ID;
		if (u_id === userID) {
			next();
		}
		else {
			return res
				.status(401)
				.send({ message: "Unauthorized. This isn't your review" });
		}
	},
	canReview: async (req, res, next) => {
		let u_id = req.user.ID;
		let c_id = parseInt(req.params.c_id);
		let is_enrolled = null;
		try {
			is_enrolled = await courseRepo.getUserEnrolled(u_id, c_id);
		} catch (err) {
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
	},
	canEnroll: async (req, res, next) => {
		let u_id = req.user.ID;
		let c_id = parseInt(req.params.c_id);
		let course = null;
		let is_enrolled = null;

		try {
			course = await courseRepo.getCourseById(c_id);
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error getting course " + err });
		}

		if (course.INSTRUCTORID === u_id) {
			return res
				.status(401)
				.send({ message: "Unauthorized. You are already instructor in this course" });
		}

		try {
			is_enrolled = await courseRepo.getUserEnrolled(u_id, c_id);
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error getting user enrolled " + err });
		}
		if (is_enrolled) {
			return res
				.status(401)
				.send({ message: "Unauthorized. You are already enrolled in this course" });
		}
		next();
	},
	canDisenroll: async (req, res, next) => {
		let u_id = req.user.ID;
		let c_id = parseInt(req.params.c_id);
		let is_enrolled = null;
		try {
			is_enrolled = await courseRepo.getUserEnrolled(u_id, c_id);
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error getting user enrolled " + err });
		}
		if (!is_enrolled) {
			return res
				.status(401)
				.send({ message: "Unauthorized. You are already not enrolled in this course" });
		}
		next();
	},
	canEnterDiscussion: async (req, res, next) => {
		let u_id = req.user.ID;
		let c_id = parseInt(req.params.c_id);
		let is_enrolled = null;
		let instructor = null;
		try {
			is_enrolled = await courseRepo.getUserEnrolled(u_id, c_id);
			instructor = await courseRepo.getCourseById(c_id);
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error getting user enrolled " + err });
		}
		if (!is_enrolled && instructor.INSTRUCTORID !== u_id) {
			return res
				.status(401)
				.send({ message: "Unauthorized. You are not enrolled in this course and aren't its instructor" });
		}
		next();
	}
}