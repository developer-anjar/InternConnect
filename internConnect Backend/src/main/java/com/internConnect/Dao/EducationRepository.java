package com.internConnect.Dao;

import com.internConnect.Entity.Education;
//import com.internConnect.Entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EducationRepository extends JpaRepository<Education, Long> {

    List<Education> findByStudentStudentId(Long studentId);
}