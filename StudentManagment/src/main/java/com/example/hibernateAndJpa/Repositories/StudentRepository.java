package com.example.hibernateAndJpa.Repositories;

import com.example.hibernateAndJpa.Entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {


}
