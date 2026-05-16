package com.internConnect.Controller;

import com.internConnect.Entity.Education;
import com.internConnect.service.EducationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/education")
@CrossOrigin(origins = "http://localhost:4200")
public class EducationController {

    @Autowired
    private EducationService educationService;

    // ✅ Save Education
    @PostMapping("/{studentId}")
    public Education saveEducation(@PathVariable Long studentId,
                                   @RequestBody Education education) {
        return educationService.saveEducation(studentId, education);
    }

    // ✅ Get Education by Student
    @GetMapping("/{studentId}")
    public List<Education> getEducation(@PathVariable Long studentId) {
        return educationService.getEducationByStudent(studentId);
    }
}