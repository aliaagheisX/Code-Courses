const studentRepo = require('../repositories/studentRepository');

module.exports = {
  getAllStudents: async (req, res) => {
    try {
      let students = await studentRepo.getAllStudents();
      if (!students.length) {
        return res
          .status(404)
          .send({ message: "Looks like you have no students" });
        }
      return res.status(200).send({ students: students });
    } catch (err) {
      return res      
        .status(500)
        .send({ message: "Internal server error getting all students" + err });
    }
  },
  getStudentById: async (req, res) => {
    try {
      let id = parseInt(req.params.s_id);
      let student = await studentRepo.getStudentById(id);
      if (!student) {
        return res
          .status(404)
          .send({ message: "Student not found" });
      }
      return res.status(200).send({ student: student });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error getting student by id" + err });
    }
  },
};