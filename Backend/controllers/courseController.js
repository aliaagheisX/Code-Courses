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
};