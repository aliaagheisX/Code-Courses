const topicRepo = require('../repositories/topicRepository');
const Joi = require('joi');

function topicValidate(columns) {
    const schema = Joi.object({
        name: Joi.string().pattern(/^[a-zA-Z]+$/).message("fname can only contain letters from the alphabet").min(2).max(32).required(),
    });
    return schema.validate(columns);
}

function topicPatchValidate(columns) {
    const schema = Joi.object({
        name: Joi.string().pattern(/^[a-zA-Z]+$/).message("fname can only contain letters from the alphabet").min(2).max(32),
    });
    return schema.validate(columns);
}

module.exports = {
    getAllTopics: async (req, res) => {
        try {
            let topics = await topicRepo.getAllTopics();
            if (!topics.length) {
                return res
                    .status(404)
                    .send({ message: "Looks like you have no topics" });
            }
            return res
                .status(200)
                .send({ topics: topics });
        } catch (err) {
            return res
                .status(500)
                .send({ message: "Internal server error getting all topics " + err });
        }
    },
    getTopicById: async (req, res) => {
        try {
            let id = parseInt(req.params.t_id);
            let topic = await topicRepo.getTopicById(id);
            if (!topic) {
                return res
                    .status(404)
                    .send({ message: "Topic doesn't exist" });
            }
            return res
                .status(200)
                .send({ topic: topic });
        } catch (err) {
            return res
                .status(500)
                .send({ message: "Internal server error getting topic by id " + err });
        }
    },
    postNewTopic: async (req, res) => {
        try {
            let columns = req.body;
            const { error } = topicValidate(columns);
            if (error) {
                return res
                    .status(403)
                    .send({ message: "Validation error " + error.details[0].message });
            }
            let response = await topicRepo.createTopic(columns['name']);
            if (!response.affectedRows) {
                return res
                    .status(500)
                    .send({ message: "Error inserting new topic" });
            }
            let insertID = response.insertId;
            let topic = await topicRepo.getTopicById(insertID);
            return res  
                .status(201)
                .send({ 
                    message: "New topic created",
                    topic: topic    
                });
        } catch (err) {
            return res
                .status(500)
                .send({ message: "Internal server error inserting new topic " + err });
        }
    },
    editTopic: async (req, res) => {
        try {
            let id = parseInt(req.params.t_id);
            let columns = req.body;
            const { error } = topicPatchValidate(columns);
            if (error) {
                return res
                    .status(403)
                    .send({ message: "Validation error " + error.details[0].message });
            }
            if (columns['name'] !== null) {
                await topicRepo.editTopic(id, columns['name']);
            }
            let topic = await topicRepo.getTopicById(id);
            return res
                .status(200)
                .send({
                    message: "Topic edited successfully",
                    topic: topic
                });
        } catch (err) {
            return res
                .status(500)
                .send({ message: "Internal server error editing topic " + err });
        }
    }
}