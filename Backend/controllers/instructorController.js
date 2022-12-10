const instructorRepo = require('../repositories/instructorRepo');

module.exports = {
  getAllInstructors: async (req, res) => {
		try {
			let instructors = await instructorRepo.getAllInstructors();
			if (!instructors.length) {
				return res
					.status(404)
					.send({ message: "Looks like there are no instructors" });
			}
			return res
				.status(200)
				.send({ instructors: instructors });
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error getting all instructors" + err });
		}
	}
}