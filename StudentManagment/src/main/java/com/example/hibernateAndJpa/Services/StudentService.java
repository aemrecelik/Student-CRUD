package com.example.hibernateAndJpa.Services;

import com.example.hibernateAndJpa.Entities.Student;
import com.example.hibernateAndJpa.Exception.ResourceNotFoundException;
import com.example.hibernateAndJpa.Repositories.StudentRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
@Transactional
public class StudentService {

    private final StudentRepository studentRepository;

    @Transactional
    public List<Student> getAll() {
        return studentRepository.findAll();
    }

    @Transactional
    public void add(Student student) {
        studentRepository.save(student);
    }

    @Transactional
    public void update(Long id, Student studentDetails) {
        Student student = studentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Student not exist"));

        student.setCity(studentDetails.getCity());
        student.setDescription(studentDetails.getDescription());
        student.setDistrict(studentDetails.getDistrict());
        student.setMobilePhoneNumber(studentDetails.getMobilePhoneNumber());
        student.setName(studentDetails.getName());
        student.setSurname(studentDetails.getSurname());

        studentRepository.save(student);
    }

    public void delete(Long id) {

        Student student = studentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Student not exist"));

        studentRepository.delete(student);
    }

}
