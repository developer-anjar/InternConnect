package com.internConnect.Controller;

import com.internConnect.service.AiRecommendationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiController {

    private final AiRecommendationService aiService;

    public AiController(AiRecommendationService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/recommendations/{studentId}")
    public List<Map<String, Object>> getRecommendations(@PathVariable Long studentId) {
        return aiService.getRecommendations(studentId);
    }
}