package com.internConnect.Dao;

import com.internConnect.Entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

	 Optional<Student> findByName(String name);  

    Optional<Student> findByEmail(String email);
}
