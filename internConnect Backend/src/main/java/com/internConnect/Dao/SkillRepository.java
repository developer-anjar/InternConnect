package com.internConnect.Dao;

import com.internConnect.Entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Long> {

    List<Skill> findByStudentStudentId(Long studentId);

    void deleteByStudentStudentId(Long studentId); // overwrite ke liye
}