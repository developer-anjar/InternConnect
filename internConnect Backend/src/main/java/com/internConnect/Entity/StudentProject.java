package com.internConnect.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "student_project")
public class StudentProject {

    @Id
    private Long studentId;   // SAME as students.studentId

    private String title;

    @Column(length = 1000)
    private String description;

    private String projectLink; // GitHub / Live URL

    public StudentProject() {}

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getProjectLink() { return projectLink; }
    public void setProjectLink(String projectLink) { this.projectLink = projectLink; }
}
