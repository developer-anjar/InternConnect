package com.internConnect.Dao;

import com.internConnect.Entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentProfileRepository
        extends JpaRepository<StudentProfile, Long> {

    // studentId is PRIMARY KEY, so default methods are enough
}
