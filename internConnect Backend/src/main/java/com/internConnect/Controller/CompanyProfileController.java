package com.internConnect.Controller;

import com.internConnect.Entity.CompanyProfile;
import com.internConnect.service.CompanyProfileService;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/company-profile")
@CrossOrigin(origins = "http://localhost:4200")
public class CompanyProfileController {

    @Autowired
    private CompanyProfileService service;

    @GetMapping("/{companyId}")
    public ResponseEntity<?> getProfile(@PathVariable Long companyId) {
        Optional<CompanyProfile> profile = service.getByCompanyId(companyId);

        if (profile.isPresent()) {
            return ResponseEntity.ok(profile.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Profile not found");
        }
    }

    @PostMapping
    public ResponseEntity<?> createProfile(@RequestBody CompanyProfile profile) {

        if (profile.getCompanyId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("companyId is required");
        }

        if (service.existsByCompanyId(profile.getCompanyId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Profile already exists");
        }

        CompanyProfile saved = service.saveOrUpdate(profile);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{companyId}")
    public ResponseEntity<?> updateProfile(@PathVariable Long companyId, @RequestBody CompanyProfile profile) {

        if (!service.existsByCompanyId(companyId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Profile not found");
        }

        profile.setCompanyId(companyId);

        CompanyProfile updated = service.saveOrUpdate(profile);
        return ResponseEntity.ok(updated);
    }
}
