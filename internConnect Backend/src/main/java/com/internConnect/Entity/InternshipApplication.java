package com.internConnect.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "internship_application",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"internship_id", "student_id"})
    }
)
public class InternshipApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applicationId;

    private Long internshipId;
    private Long studentId;
    private Long companyId;
    private String companyName;
    private String internshipTitle;

    private String status; // PENDING / APPROVED / REJECTED

    private LocalDateTime appliedAt;

    // ✅ REQUIRED by Hibernate
    public InternshipApplication() {
    }

    // Parameterized constructor
    public InternshipApplication(Long applicationId, Long internshipId, Long studentId,
                                 Long companyId, String status, LocalDateTime appliedAt,
                                 String companyName, String internshipTitle) {
        this.applicationId = applicationId;
        this.internshipId = internshipId;
        this.studentId = studentId;
        this.companyId = companyId;
        this.status = status;
        this.appliedAt = appliedAt;
        this.companyName = companyName;
        this.internshipTitle = internshipTitle;
    }

    public Long getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }

    public Long getInternshipId() {
        return internshipId;
    }

    public void setInternshipId(Long internshipId) {
        this.internshipId = internshipId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }

    public void setAppliedAt(LocalDateTime appliedAt) {
        this.appliedAt = appliedAt;
    }

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getInternshipTitle() {
		return internshipTitle;
	}

	public void setInternshipTitle(String internshipTitle) {
		this.internshipTitle = internshipTitle;
	}
}