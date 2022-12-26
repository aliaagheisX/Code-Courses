const messageRepo = require('../repositories/messageRepository');

module.exports = {
    getCourseDiscussion: async (req, res) => {
        try {
            let c_id = parseInt(req.params.c_id);
            let messages = await messageRepo.getDiscussionMessages(c_id);
            if (!messages.length) {
                return res
                    .status(404)
                    .send({ message: "No messages in this room" });
            }
            return res
                .status(200)
                .send({ messages: messages });
        } catch (err) {
            return res
                .status(500)
                .send({ message: "Internal server error getting messages " + err });
        }
    }
}