package com.internConnect.Controller;

import com.internConnect.service.AiResumeService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:4200")
public class AiResumeController {

    private final AiResumeService aiResumeService;

    public AiResumeController(AiResumeService aiResumeService) {
        this.aiResumeService = aiResumeService;
    }

    @PostMapping("/generate-resume")
    public Map<String, String> generateResume(@RequestBody Map<String, Object> payload) {
        String resume = aiResumeService.generateResume(payload);
        return Map.of("resumeContent", resume);
    }
}