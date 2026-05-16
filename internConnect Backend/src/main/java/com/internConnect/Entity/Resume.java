package com.internConnect.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "resume")
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileUrl;

    @OneToOne
    @JoinColumn(name = "student_id")
    private Student student;

    // getters setters
    public Long getId() { return id; }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }
}