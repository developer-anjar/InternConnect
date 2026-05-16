package com.internConnect.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String skillName;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    // getters setters
    public Long getId() { return id; }

    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }
}