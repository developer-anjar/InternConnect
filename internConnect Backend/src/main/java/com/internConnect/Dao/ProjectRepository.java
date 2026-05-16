package com.internConnect.Dao;

import com.internConnect.Entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByStudentStudentId(Long studentId);

    void deleteByStudentStudentId(Long studentId); // overwrite support
}