package com.internConnect.Dao;

import com.internConnect.Entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResumeRepository extends JpaRepository<Resume, Long> {

    Optional<Resume> findByStudentStudentId(Long studentId);
}