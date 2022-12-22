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

			///// instructor /////
			let fname = req.user.FNAME;
			let lname = req.user.SNAME;

			let element_id = await elementRepo.createElement(course, imagePath);
			let response = await courseRepo.createCourse(course, element_id, fname, lname);
			//add topics to course
			await courseRepo.addTopicsToCourse(element_id, course.topics)
			return res
				.status(200)
				.send({ message: "Course created successfully", course_id: element_id });
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error creating course " + err });
		}
	},
	editCourseTopics: async (req, res) => {
		try {
			let c_id = req.params.c_id;
			let columns = req.body;
			const { error } = topicListValidate(columns);
			if (error) {
				return res
					.status(403)
					.send({ message: "Validation error " + error.details[0].message });
			}
			await courseRepo.deleteCourseTopics(c_id);
			for (let index in columns.topics) {
				let t_id = columns.topics[index];
				await courseRepo.addTopicToArticle(c_id, t_id);
			}
			let topics = await courseRepo.getArticleTopics(c_id);
			return res
				.status(201)
				.send({
					message: "Course topics edited successfully",
					topics: topics,
				});
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error adding topic to course " + err });
		}
	},
};