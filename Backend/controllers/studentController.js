const articleRepo = require('../repositories/articleRepository');
const courseRepo = require('../repositories/courseRepository');
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
      let readCount = await articleRepo.readCountUser(id);
      let articlesRead = await articleRepo.getArticlesReadByUser(id);
      let articlesLiked = await articleRepo.getArticlesLikedByUser(id);
      let coursesEnrolled = await courseRepo.getCoursesOfStudent(id);
      let coursesCount = coursesEnrolled.length

      return res.status(200).send({
        student: student,
        readCount: readCount,
        articlesRead: articlesRead,
        articlesLiked: articlesLiked,
        coursesEnrolled: coursesEnrolled,
        coursesCount: coursesCount
      });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error getting student by id" + err });
    }
  },
  deleteAllStudents: async (req, res) => {
    try {
      let rows = await studentRepo.deleteAllStudents();
      if (!rows.affectedRows) {
        return res
          .status(404)
          .send({ message: "Looks like you have no students " });
      }
      return res.status(200).send({ message: "All students deleted" });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error deleting all students" + err });
    }
  },
  deleteStudentById: async (req, res) => {
    try {
      let id = parseInt(req.params.id);
      let rows = await studentRepo.deleteStudentById(id);
      if (!rows.affectedRows) {
        return res.status(404).send({ message: "Student not found" });
      }
      return res.status(200).send({ message: "Student deleted successfully" });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error deleting student\n" + err });
    }
  }
};