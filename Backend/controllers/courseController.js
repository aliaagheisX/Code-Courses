const courseRepo = require('../repositories/courseRepository');
const elementRepo = require('../repositories/elementRepository');
const topicRepo = require('../repositories/topicRepository');
const userRepo = require('../repositories/userRepository');
const Joi = require('joi');

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
	getCourseById: async (req, res) => {
		try {
			let id = parseInt(req.params.id);
			let course = await courseRepo.getCourseById(id);


			if (!course.ID) {
				return res
					.status(404)
					.send({ message: "Course not found" });
			}
			let is_enrolled = null;
			if (req.body.id !== undefined)
				is_enrolled = await courseRepo.getUserEnrolled(req.body.id, course.ID);
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
			let imagePath = req.file?.path || "images/4.jpg"

			imagePath = "http://localhost:4000/" + imagePath.replace('\\', '/')


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
	createReview: async (req, res) => {
		try {
			let c_id = parseInt(req.params.c_id);
			let u_id = parseInt(req.user.ID);
			let review = req.body;
			const { error } = validateReview(review);
			if (error) {
				return res
					.status(403)
					.send({ message: "Validation error " + error.details[0].message });
			}
			const { body, rating } = review;
			await courseRepo.createReview(c_id, u_id, body, rating);
			let reviews = await courseRepo.getCourseReviews(c_id);
			return res
				.status(201)
				.send({
					message: "Review added successfully",
					reviews: reviews,
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
			return res
				.status(200)
				.send({
					message: "Review edited successfully",
					review: review,
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
			return res
				.status(200)
				.send({ message: "Review deleted successfully" });
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
				.send({ message: "Course reviews deleted successfully "});
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error deleting course reviews " + err });
		}
	}
};