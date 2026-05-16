package com.internConnect.Controller;

import com.internConnect.Entity.StudentProfile;
import com.internConnect.service.StudentProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student-profile")
@CrossOrigin(origins = "http://localhost:4200")
public class StudentProfileController {

    @Autowired
    private StudentProfileService service;

    @GetMapping("/{studentId}")
    public ResponseEntity<?> getProfile(@PathVariable Long studentId) {

        StudentProfile profile = service.getProfileByStudentId(studentId);

        if (profile == null) {
            return ResponseEntity.status(404).body("Profile not found");
        }

        return ResponseEntity.ok(profile);
    }

    @PostMapping
    public ResponseEntity<?> createProfile(@RequestBody StudentProfile profile) {

        if (profile.getStudentId() == null) {
            return ResponseEntity.badRequest().body("studentId required");
        }

        StudentProfile saved = service.saveOrUpdateProfile(profile);
        return ResponseEntity.status(201).body(saved);
    }

    @PutMapping("/{studentId}")
    public ResponseEntity<?> updateProfile(
            @PathVariable Long studentId,
            @RequestBody StudentProfile profile) {

        profile.setStudentId(studentId);
        StudentProfile updated = service.saveOrUpdateProfile(profile);
        return ResponseEntity.ok(updated);
    }
}
