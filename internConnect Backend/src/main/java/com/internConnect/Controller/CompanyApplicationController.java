package com.internConnect.Controller;

import com.internConnect.Entity.InternshipApplication;
import com.internConnect.service.InternshipApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company/applications")
@CrossOrigin(origins = "http://localhost:4200")
public class CompanyApplicationController {

    @Autowired
    private InternshipApplicationService service;

    // 1️⃣ View all applications of company
    @GetMapping("/{companyId}")
    public ResponseEntity<?> getCompanyApplications(@PathVariable Long companyId) {
        List<InternshipApplication> list = service.getByCompany(companyId);
        return ResponseEntity.ok(list);
    }

    // 2️⃣ View applications per internship
    @GetMapping("/internship/{internshipId}")
    public ResponseEntity<?> getByInternship(@PathVariable Long internshipId) {
        return ResponseEntity.ok(service.getByInternship(internshipId));
    }

    // 3️⃣ Approve / Reject
    @PutMapping("/{applicationId}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long applicationId,
            @RequestParam String status) {

        if (!status.equals("APPROVED") && !status.equals("REJECTED")) {
            return ResponseEntity.badRequest().body("Invalid status");
        }

        return ResponseEntity.ok(
                service.updateStatus(applicationId, status)
        );
    }
}
