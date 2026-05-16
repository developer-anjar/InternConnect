package com.internConnect.Controller;

import com.internConnect.Entity.Internship;
import com.internConnect.Entity.InternshipApplication;
import com.internConnect.service.InternshipApplicationService;
import com.internConnect.service.InternshipService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/internship")
@CrossOrigin(origins = "http://localhost:4200")
public class StudentInternshipController {

    @Autowired
    private InternshipService internshipService;

    @Autowired
    private InternshipApplicationService applicationService;

    // VIEW ALL ACTIVE INTERNSHIPS
    @GetMapping("/active")
    public ResponseEntity<List<Internship>> getActiveInternships() {

        List<Internship> internships =
                internshipService.getAll()
                        .stream()
                        .filter(i -> "ACTIVE".equals(i.getStatus()))
                        .toList();

        return ResponseEntity.ok(internships);
    }


    // VIEW INTERNSHIP DETAIL
    @GetMapping("/{internshipId}")
    public ResponseEntity<?> getInternship(@PathVariable Long internshipId) {

        return internshipService.getById(internshipId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // APPLY FOR INTERNSHIP
    @PostMapping("/apply")
    public ResponseEntity<?> apply(@RequestBody InternshipApplication application) {

        if (application.getStudentId() == null || application.getInternshipId() == null) {
            return ResponseEntity.badRequest().body("studentId & internshipId required");
        }

        try {
            return ResponseEntity.ok(applicationService.apply(application));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Already applied");
        }
    }
    @GetMapping("/applications/{studentId}")
    public ResponseEntity<?> getStudentApplications(@PathVariable Long studentId) {
        return ResponseEntity.ok(applicationService.getByStudent(studentId));
    }
}
