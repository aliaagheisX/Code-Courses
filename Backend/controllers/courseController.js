const courseRepo = require('../repositories/courseRepository');
const elementRepo = require('../repositories/elementRepository');
const topicRepo = require('../repositories/topicRepository');
const Joi = require('joi');
const { getUserId } = require('../helpers/userHelper')
function topicListValidate(columns) {
	const schema = Joi.object({
		topics: Joi.array().items(Joi.number()).min(1).required(),
	});
	return schema.validate(columns);
}

function validateReview(review) {
	const schema = Joi.object({
		body: Joi.string().min(1).max(256).message("Body can't exceed 256 characters")
			.required().message("Body is required"),
		rating: Joi.number().min(0).max(5).message("rating can't exceed 5")
			.required().message("Rating is required"),
	});
	return schema.validate(review);
}

function patchReviewValidate(review) {
	const schema = Joi.object({
		body: Joi.string().min(1).max(256).message("Body can't exceed 256 characters"),
		rating: Joi.number().min(0).max(5).message("rating can't exceed 5"),
	});
	return schema.validate(review);
}

function courseValidate(columns) {
	const schema = Joi.object({
		topics: Joi.array().items(Joi.number()).min(1).required(),
		image: Joi.any(),
		title: Joi.string().required().min(2).max(25),
		description: Joi.string().required().min(20).max(150),
		pre: Joi.string().min(3).max(256),
		instructor_id: Joi.number().required()
	});
	return schema.validate(columns);
}


function coursePatchValidate(columns) {
	const schema = Joi.object({
		topics: Joi.array().items(Joi.number()).min(1).required(),
		image: Joi.any(),
		title: Joi.string().allow(null, '').min(2).max(25),
		description: Joi.string().allow(null, '').min(20).max(150),
		pre: Joi.string().min(3).max(256).allow(null, '')
	});
	return schema.validate(columns);
}




module.exports = {
	getAllCourses: async (req, res) => {
		try {
			let courses = await courseRepo.getAllCourses();
			if (!courses.length) {
				return res
					.status(404)
					.send({ message: "Looks like you have no courses" });
			}
			return res.status(200).send({ courses: courses });
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error getting all courses" + err });
		}
	},
	getCoursesOfInstructor: async (req, res) => {
		try {
			const instructor_id = req.params.i_id;

			let courses = await courseRepo.getCoursesOfInstructor(instructor_id);
			if (!courses.length) {
				return res
					.status(404)
					.send({ message: "Looks like you have no courses" });
			}
			return res.status(200).send({ courses: courses });
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error getting all courses" + err });
		}
	},
	getCoursesOfStudent: async (req, res) => {
		try {
			let id = parseInt(req.params.s_id);
			let courses = await courseRepo.getCoursesOfStudent(id);
			if (!courses.length) {
				return res
					.status(404)
					.send({ message: "Looks like you have no courses" });
			}
			return res.status(200).send({ courses: courses });
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error getting all courses" + err });
		}
	},
	getCourseById: async (req, res) => {
		try {
			let id = parseInt(req.params.id);
			let course = await courseRepo.getCourseById(id);


			if (!course.ID) {
				return res
					.status(404)
					.send({ message: "Course not found" });
			}
			const u_id = await getUserId(req);
			let is_enrolled = 0;
			if (u_id !== null)
				is_enrolled = await courseRepo.getUserEnrolled(u_id, course.ID);

			let rating = await courseRepo.getCourseRating(id);
			let reviews = await courseRepo.getCourseReviews(id);
			const topics = await courseRepo.getCourseTopics(id);
			return res.status(200).send({
				course: course,
				rating: rating,
				reviews: reviews,
				topics: topics,
				is_enrolled: is_enrolled
			});
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error getting article by id" + err });
		}
	},
	createCourse: async (req, res) => {
		try {
			let course = req.body;
			//parse topics
			course.topics = JSON.parse(course.topics);
			const { error } = courseValidate(course);
			if (error) {
				return res
					.status(403)
					.send({ message: "Validation error " + error.details[0].message });
			}
			///// image /////
			let imagePath = "./4.jpg";
			if (req.file?.path)
				imagePath = "https://codecoursesbackend.onrender.com/" + imagePath.replace('\\', '/');

			let response = await courseRepo.createCourse(course, imagePath);
			const c_id = response['@course_id']

			//add topics to course
			await courseRepo.addTopicsToCourse(c_id, course.topics)
			return res
				.status(200)
				.send({ message: "Course created successfully", course_id: c_id });
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error creating course " + err });
		}
	},

	editCourse: async (req, res) => {
		try {
			let id = req.params.c_id;
			let course = req.body;
			//parse topics
			course.topics = JSON.parse(course.topics);
			const { error } = coursePatchValidate(course);
			if (error) {
				return res
					.status(403)
					.send({ message: "Validation error " + error.details[0].message });
			}
			if (course.title !== '') {
				try {
					let edit_title = await elementRepo.editElementTitle(course, id)
				} catch (err) {
					return res
						.status(500)
						.send({ message: "Internal server error posting course " + err });
				}
			}
			if (course.description !== '') {
				try {
					let edit_description = await elementRepo.editElementDescription(course, id)
				} catch (err) {
					return res
						.status(500)
						.send({ message: "Internal server error posting course " + err });
				}
			}
			if (course.pre !== '') {
				try {
					let edit_pre = await courseRepo.editCoursePre(course.pre, id)
				} catch (err) {
					return res
						.status(500)
						.send({ message: "Internal server error posting course " + err });
				}
			}
			if (req.file?.path != null) {
				let imagePath = req.file.path
				imagePath = "https://codecoursesbackend.onrender.com/" + imagePath.replace('\\', '/')
				try {
					await elementRepo.editImage(id, imagePath);
				} catch (err) {
					return res
						.status(500)
						.send({ message: "Internal server error editing article " + err });
				}

			}
			//add topics to course
			await courseRepo.removeTopicsFromCourse(id)
			await courseRepo.addTopicsToCourse(id, course.topics)

			return res
				.status(200)
				.send({ message: "Course edited successfully" });
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error creating course " + err });
		}
	},
	deleteCourseById: async (req, res) => {
		try {
			let id = parseInt(req.params.c_id);
			let rows = await courseRepo.deleteCourseById(id);
			if (!rows.affectedRows) {
				return res
					.status(404)
					.send({ message: "Course not found" });
			}
			return res
				.status(200)
				.send({ message: "Course deleted successfully" });
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error deleting Course by id" + err });
		}
	},
	enrollCourse: async (req, res) => {
		try {
			let c_id = parseInt(req.params.c_id);
			let u_id = parseInt(req.user.ID);

			await courseRepo.enrollCourse(u_id, c_id);
			return res
				.status(200)
				.send({ message: "successfully enrolled" })
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error enrolling in course " + err });
		}
	},
	disenrollCourse: async (req, res) => {
		try {
			let c_id = parseInt(req.params.c_id);
			let u_id = parseInt(req.user.ID);

			await courseRepo.disenrollCourse(u_id, c_id);
			return res
				.status(200)
				.send({ message: "successfully disenrolled" })
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error disenrolling in course " + err });
		}
	},
	createReview: async (req, res) => {
		try {
			let c_id = parseInt(req.params.c_id);
			let u_id = parseInt(req.user.ID);
			let review_b = req.body;
			const { error } = validateReview(review_b);
			if (error) {
				return res
					.status(403)
					.send({ message: "Validation error " + error.details[0].message });
			}
			const { body, rating } = review_b;
			await courseRepo.createReview(c_id, u_id, body, rating);
			let review = await courseRepo.getCourseUserReview(c_id);
			return res
				.status(201)
				.send({
					message: "Review added successfully",
					review: review,
				})
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error creating review " + err });
		}
	},
	editReview: async (req, res) => {
		try {
			let c_id = parseInt(req.params.c_id);
			let u_id = parseInt(req.params.u_id);
			let newReview = req.body;
			const { error } = patchReviewValidate(newReview);
			if (error) {
				return res
					.status(403)
					.send({ message: "Validation error " + error.details[0].message });
			}
			if (newReview["body"] !== null && newReview["body"] !== "") {
				await courseRepo.editReviewBody(newReview["body"], c_id, u_id);
			}
			if (newReview["rating"] !== null && newReview["rating"] !== "") {
				await courseRepo.editReviewRating(newReview["rating"], c_id, u_id);
			}
			let review = await courseRepo.getReview(c_id, u_id);
			let rating = await courseRepo.getCourseRating(c_id);
			return res
				.status(200)
				.send({
					message: "Review edited successfully",
					review: review,
					rating: rating
				});
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error editing review " + err });
		}
	},
	deleteOneReview: async (req, res) => {
		try {
			let c_id = parseInt(req.params.c_id);
			let u_id = parseInt(req.params.u_id);
			let response = await courseRepo.deleteOneReview(c_id, u_id);

			if (!response.affectedRows) {
				return res
					.status(404)
					.send({ message: "Review doesn't exist" });
			}
			let rating = await courseRepo.getCourseRating(c_id);
			return res
				.status(200)
				.send({ message: "Review deleted successfully", rating: rating });
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error deleting review " + err });
		}
	},
	deleteCourseReviews: async (req, res) => {
		try {
			let c_id = parseInt(req.params.c_id);
			let response = await courseRepo.deleteCourseReviews(c_id);
			if (!response.affectedRows) {
				return res
					.status(404)
					.send({ message: "Course has no reviews" });
			}
			return res
				.status(200)
				.send({ message: "Course reviews deleted successfully " });
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error deleting course reviews " + err });
		}
	}
};