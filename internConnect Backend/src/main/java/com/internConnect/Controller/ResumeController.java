package com.internConnect.Controller;

import com.internConnect.Entity.Resume;
import com.internConnect.service.ResumeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "http://localhost:4200")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    // Upload resume
    @PostMapping("/{studentId}")
    public Resume uploadResume(@PathVariable Long studentId,
                               @RequestParam("file") MultipartFile file) throws Exception {
        return resumeService.uploadResume(studentId, file);
    }

    // Get resume
    @GetMapping("/{studentId}")
    public Resume getResume(@PathVariable Long studentId) {
        return resumeService.getResume(studentId);
    }
}