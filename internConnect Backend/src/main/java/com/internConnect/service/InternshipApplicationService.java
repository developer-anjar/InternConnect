package com.internConnect.service;

import com.internConnect.Dao.InternshipApplicationRepository;
import com.internConnect.Entity.InternshipApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class InternshipApplicationService {

    @Autowired
    private InternshipApplicationRepository repo;

    public InternshipApplication apply(InternshipApplication app) {

        if (repo.findByInternshipIdAndStudentId(
                app.getInternshipId(), app.getStudentId()).isPresent()) {
            throw new RuntimeException("Already applied");
        }

        app.setStatus("PENDING");
        app.setAppliedAt(LocalDateTime.now());

        return repo.save(app);
    }
    public List<InternshipApplication> getByStudent(Long studentId) {
        return repo.findByStudentId(studentId);
    }

    public List<InternshipApplication> getByCompany(Long companyId) {
        return repo.findByCompanyId(companyId);
    }

    public List<InternshipApplication> getByInternship(Long internshipId) {
        return repo.findByInternshipId(internshipId);
    }

    public InternshipApplication updateStatus(Long applicationId, String status) {
        InternshipApplication app = repo.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        app.setStatus(status);
        return repo.save(app);
    }
}
