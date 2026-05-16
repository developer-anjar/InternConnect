package com.internConnect.Dao;

import com.internConnect.Entity.InternshipApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InternshipApplicationRepository
        extends JpaRepository<InternshipApplication, Long> {
	List<InternshipApplication> findByStudentId(Long studentId);
    List<InternshipApplication> findByCompanyId(Long companyId);

    List<InternshipApplication> findByInternshipId(Long internshipId);

    Optional<InternshipApplication> findByInternshipIdAndStudentId(
            Long internshipId, Long studentId
    );
}
