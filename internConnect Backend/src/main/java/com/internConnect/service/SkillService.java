package com.internConnect.service;

import com.internConnect.Entity.Skill;
import com.internConnect.Entity.Student;
import com.internConnect.Dao.SkillRepository;
import com.internConnect.Dao.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Transactional
    public void saveSkills(Long studentId, List<String> skills) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Purane skills delete (overwrite)
        skillRepository.deleteByStudentStudentId(studentId);

        for (String s : skills) {
            Skill skill = new Skill();
            skill.setSkillName(s.trim());
            skill.setStudent(student);
            skillRepository.save(skill);
        }
    }

    public List<Skill> getSkills(Long studentId) {
        return skillRepository.findByStudentStudentId(studentId);
    }
}