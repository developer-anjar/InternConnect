package com.internConnect.service;

import com.internConnect.Dao.StudentRepository;
import com.internConnect.Entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Create or update student
    public Student saveOrUpdateStudent(Student student) {
        return studentRepository.save(student);
    }

    // Find student by ID
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Delete student by ID
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    // Check if email exists
    public boolean existsByEmail(String email) {
        return studentRepository.findByEmail(email).isPresent();
    }

    // Find student by email
    public Optional<Student> findByEmail(String email) {
        return studentRepository.findByEmail(email);
    }
}
