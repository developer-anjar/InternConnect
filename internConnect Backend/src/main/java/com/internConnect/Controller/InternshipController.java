package com.internConnect.Controller;

import com.internConnect.Dao.InternshipRepository;
import com.internConnect.Dao.SkillRepository;
import com.internConnect.Dao.EducationRepository;
import com.internConnect.Entity.Internship;
import com.internConnect.service.InternshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Arrays;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/company/internship")
@CrossOrigin(origins = "http://localhost:4200")
public class InternshipController {

    @Autowired
    private InternshipService service;

    @Autowired
    private SkillRepository skillRepo;

    @Autowired
    private EducationRepository educationRepo;

    @Autowired
    private InternshipRepository internshipRepository;

    // ================= CREATE =================
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Internship internship) {

        if (internship.getCompanyId() == null) {
            return ResponseEntity.badRequest().body("companyId is required");
        }

        Internship savedInternship = service.saveOrUpdate(internship);
        return ResponseEntity.ok(savedInternship);
    }

    // ================= UPDATE =================
    @PutMapping("/{internshipId}")
    public ResponseEntity<?> update(
            @PathVariable Long internshipId,
            @RequestBody Internship internship) {

        internship.setInternshipId(internshipId);
        Internship updatedInternship = service.saveOrUpdate(internship);
        return ResponseEntity.ok(updatedInternship);
    }

    // ================= DELETE =================
    @DeleteMapping("/{internshipId}")
    public ResponseEntity<?> delete(@PathVariable Long internshipId) {

        service.deleteById(internshipId);
        return ResponseEntity.ok("Internship deleted successfully");
    }

    // ================= GET BY ID (🔥 FIX FOR YOUR ERROR) =================
    @GetMapping("/{internshipId}")
    public ResponseEntity<Internship> getById(@PathVariable Long internshipId) {

        return service.getById(internshipId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    // ================= GET BY COMPANY =================
    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<Internship>> getByCompany(@PathVariable Long companyId) {

        return ResponseEntity.ok(service.getByCompanyId(companyId));
    }

    // ================= GET ALL (PUBLIC) =================
    @GetMapping("/public")
    public ResponseEntity<List<Internship>> getAllPublic() {

        return ResponseEntity.ok(service.getAll());
    }
    
    @GetMapping("/ai/recommendations/{studentId}")
    public ResponseEntity<List<Internship>> getRecommendations(@PathVariable Long studentId) {

        // fetch student skills (SkillRepository returns List<Skill>)
        List<String> studentSkills = skillRepo.findByStudentStudentId(studentId).stream()
                .map(skill -> skill.getSkillName() == null ? "" : skill.getSkillName().trim().toLowerCase())
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toList());

        // fetch education entries and pick the first (if any) to derive qualification
        List<com.internConnect.Entity.Education> educations = educationRepo.findByStudentStudentId(studentId);
        String qualification = "";
        if (educations != null && !educations.isEmpty() && educations.get(0) != null) {
            qualification = educations.get(0).getCourse() == null ? "" : educations.get(0).getCourse().trim();
        }

        // fetch all internships
        List<Internship> internships = internshipRepository.findAll();

        // make qualification effectively final for use in lambda
        final String qual = qualification;

        List<Internship> recommended = internships.stream()
                .filter(internship -> {
                    String skillsStr = internship.getSkills() == null ? "" : internship.getSkills();
                    List<String> internshipSkills = Arrays.stream(skillsStr.split(","))
                            .map(String::trim)
                            .filter(s -> !s.isEmpty())
                            .map(String::toLowerCase)
                            .collect(Collectors.toList());

                    boolean skillMatch = !studentSkills.isEmpty() && studentSkills.stream()
                            .anyMatch(internshipSkills::contains);

                    boolean qualMatch = !qual.isEmpty() && internship.getQualification() != null &&
                            internship.getQualification().toLowerCase().contains(qual.toLowerCase());

                    return skillMatch || qualMatch;
                })
                .limit(5)
                .collect(Collectors.toList());

        return ResponseEntity.ok(recommended);
    }
}
