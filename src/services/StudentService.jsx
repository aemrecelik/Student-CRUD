import axios from "axios";

const url = "http://localhost:8080/api/students";

export default class StudentService {
  getAllStudents() {
    return axios.get(url);
  }

  createStudent(student) {
    console.log("burda");
    return axios.post(url, student);
  }

  updateStudent(id, student) {
    return axios.put(url + "/" + id, student);
  }

  deleteStudent(id) {
    return axios.delete(url + "/" + id);
  }
}
