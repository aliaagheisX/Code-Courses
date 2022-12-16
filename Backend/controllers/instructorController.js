const instructorRepo = require("../repositories/instructorRepo");
const Joi = require("joi");

function ratingValidate(columns) {
  const schema = Joi.object({
    rating: Joi.number().min(0).max(10),
  });
  return schema.validate(columns);
}

module.exports = {
  getAllInstructors: async (req, res) => {
    try {
      let instructors = await instructorRepo.getAllInstructors();
      if (!instructors.length) {
        return res
          .status(404)
          .send({ message: "Looks like there are no instructors" });
      }
      return res.status(200).send({ instructors: instructors });
    } catch (err) {
      return res.status(500).send({
        message: "Internal server error getting all instructors" + err,
      });
    }
  },
  getInstructorById: async (req, res) => {
    try {
      let id = parseInt(req.params.i_id);
      let instructor = await instructorRepo.getInstructorById(id);
      if (!instructor) {
        return res.status(404).send({ message: "Instructor not found" });
      }
      return res.status(200).send({ instructor: instructor });
    } catch (err) {
      return res.status(500).send({
        message: "Internal server error retrieving instructor by id" + err,
      });
    }
  },
  postNewInstructor: async (req, res) => {
    try {
      let id = parseInt(req.user.ID);
      let rows = await instructorRepo.createInstructor(id);
      let insertID = rows.insertId;
      let instructor = await instructorRepo.getInstructorById(insertID);
      return res.status(201).send({
        message: "Instructor added successfully",
        instructor: instructor,
      });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error adding new instructor" + err });
    }
  },
  editInstructor: async (req, res) => {
    let id = parseInt(req.params.i_id);
    let columns = req.body;

    const { error } = ratingValidate(columns);
    if (error) {
      return res.status(403).send({
        message:
          "Validation error editing instructor " + error.details[0].message,
      });
    }

    try {
      // if (errors) {
      // }
      if (columns["rating"] !== null) {
        await instructorRepo.editInstructor(id, columns["rating"]);
      }
      let instructor = await instructorRepo.getInstructorById(id);
      return res.status(200).send({
        message: "Instructor edited successfully",
        instructor: instructor,
      });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error editing instructor " + err });
    }
  },
  deleteInstructor: async (req, res) => {
    let id = parseInt(req.params.i_id);
    try {
      let instructor = await instructorRepo.getInstructorById(id);
      if (!instructor) {
        return res.status(403).send({
          message: "Instructor not present",
          instructor: instructor,
        });
      } else {
        let delete_instructor = await instructorRepo.deleteInstructorById(id);
      }

      return res.status(200).send({
        message: "Instructor deleted successfully",
        instructor: instructor,
      });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error deleting instructor " + err });
    }
  },
  deleteAllInstructors: async (req, res) => {
    try {
      let delete_instructors = await instructorRepo.deleteAllInstructors();
      return res.status(200).send({
        message: "All Instructors deleted successfully",
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ message: "Internal server error deleting instructor " + err });
    }
  },
};
