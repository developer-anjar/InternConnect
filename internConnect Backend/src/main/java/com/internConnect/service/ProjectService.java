package com.internConnect.service;

import com.internConnect.Entity.Project;
import com.internConnect.Entity.Student;
import com.internConnect.Dao.ProjectRepository;
import com.internConnect.Dao.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private StudentRepository studentRepository;

    public Project saveProject(Long studentId, Project project) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        project.setStudent(student);
        return projectRepository.save(project);
    }

    public List<Project> getProjects(Long studentId) {
        return projectRepository.findByStudentStudentId(studentId);
    }
}