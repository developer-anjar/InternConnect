package com.internConnect.service;

import com.internConnect.Entity.*;
import com.internConnect.Dao.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class ChatService {

    @Value("${groq.api.key}")
    private String apiKey;

    private static final String API_URL = "https://api.groq.com/openai/v1/chat/completions";

    @Autowired
    private InternshipRepository internshipRepository;

    @Autowired
    private AiRecommendationService aiRecommendationService;

    private final RestTemplate restTemplate = new RestTemplate();

    // 🔥 MAIN METHOD
    public String getResponse(String userMessage, Long studentId) {

        String msg = userMessage.toLowerCase();

        // 🔥 Detect internship-related queries
        if (msg.contains("internship") || msg.contains("suggest") || msg.contains("recommend")) {
            return getRecommendedInternships(studentId);
        }

        // 🤖 Otherwise use AI
        return callGroqAI(userMessage);
    }

    // 🔥 AI CALL (Groq)
    private String callGroqAI(String userMessage) {

        Map<String, Object> requestBody = new HashMap<>();

        requestBody.put("model", "llama-3.1-8b-instant");

        requestBody.put("messages", List.of(
                Map.of(
                        "role", "system",
                        "content", "You are an AI career assistant. Help students with internships, resumes, interview prep, and career guidance in simple language."
                ),
                Map.of(
                        "role", "user",
                        "content", userMessage
                )
        ));

        requestBody.put("temperature", 0.7);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                    API_URL,
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            List<Map<String, Object>> choices =
                    (List<Map<String, Object>>) response.getBody().get("choices");

            Map<String, Object> message =
                    (Map<String, Object>) choices.get(0).get("message");

            return message.get("content").toString();

        } catch (Exception e) {
            e.printStackTrace();
            return "⚠️ AI is currently unavailable. Please try again later.";
        }
    }

    // 🔥 SMART RECOMMENDATION (BEST FEATURE)
    private String getRecommendedInternships(Long studentId) {

        try {
            List<Map<String, Object>> list = aiRecommendationService.getRecommendations(studentId);

            if (list == null || list.isEmpty()) {
                return "No matching internships found. Try updating your skills or profile.";
            }

            StringBuilder response = new StringBuilder("🎯 Recommended Internships:\n\n");

            for (Map<String, Object> i : list) {
                response.append("• ")
                        .append(i.get("internshipTitle"))
                        .append(" at ")
                        .append(i.get("companyName"))
                        .append("\n📍 ")
                        .append(i.get("companyLocation"))
                        .append(" | 💰 ₹")
                        .append(i.get("stipend"))
                        .append(" | ⭐ Score: ")
                        .append(i.get("score"))
                        .append("%\n\n");
            }

            return response.toString();

        } catch (Exception e) {
            e.printStackTrace();
            return "Error fetching internship recommendations.";
        }
    }
}