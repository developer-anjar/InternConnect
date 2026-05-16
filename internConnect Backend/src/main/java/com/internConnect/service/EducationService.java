package com.internConnect.service;

import com.internConnect.Entity.Education;
import com.internConnect.Entity.Student;
import com.internConnect.Dao.EducationRepository;
import com.internConnect.Dao.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducationService {

    @Autowired
    private EducationRepository educationRepository;

    @Autowired
    private StudentRepository studentRepository;

    public Education saveEducation(Long studentId, Education education) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        education.setStudent(student);
        return educationRepository.save(education);
    }

    public List<Education> getEducationByStudent(Long studentId) {
        return educationRepository.findByStudentStudentId(studentId);
    }
}