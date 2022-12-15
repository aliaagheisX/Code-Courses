const instructorRepo = require('../repositories/instructorRepo');

module.exports = {
    isInstructor: async (id) => {
        let instructor = await instructorRepo.getInstructorById(id);
        if (instructor) {
            return true;
        } else {
            return false;
        }
    },
}