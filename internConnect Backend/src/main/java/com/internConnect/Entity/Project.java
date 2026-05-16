package com.internConnect.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String tech;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    // getters setters

    public Long getId() { return id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getTech() { return tech; }
    public void setTech(String tech) { this.tech = tech; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }
}