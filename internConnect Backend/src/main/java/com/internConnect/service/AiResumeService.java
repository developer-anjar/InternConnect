package com.internConnect.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.client.ResourceAccessException;

import java.util.*;

@Service
public class AiResumeService {

    private static final Logger log = LoggerFactory.getLogger(AiResumeService.class);

    @Value("${groq.api.key:}")
    private String apiKey;

    // Keep as a constant but you can change to your provider (OpenAI/Groq) as needed
    private static final String API_URL = "https://api.groq.com/openai/v1/chat/completions";

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateResume(Map<String, Object> payload) {
        String prompt = buildPrompt(payload);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "llama-3.1-8b-instant");

        List<Map<String, String>> messages = new ArrayList<>();
        messages.add(Map.of(
                "role", "system",
                "content", "You are a professional resume writer. Generate a clean ATS-friendly resume."
        ));
        messages.add(Map.of(
                "role", "user",
                "content", prompt
        ));

        requestBody.put("messages", messages);
        requestBody.put("temperature", 0.7);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        if (apiKey == null || apiKey.isBlank()) {
            log.warn("API key is not set (groq.api.key). Request will probably fail.");
        } else {
            headers.setBearerAuth(apiKey);
        }

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                    API_URL,
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            if (!response.getStatusCode().is2xxSuccessful()) {
                log.error("AI API returned non-2xx status: {}", response.getStatusCode());
                return "AI generation failed: upstream service returned " + response.getStatusCode();
            }

            Map<String, Object> body = response.getBody();
            if (body == null) {
                log.error("AI API response body is null");
                return "AI generation failed: empty response";
            }

            // safely extract choices -> message -> content
            Object choicesObj = body.get("choices");
            if (!(choicesObj instanceof List)) {
                log.error("Unexpected choices structure in AI response: {}", choicesObj);
                return "AI generation failed: unexpected response format";
            }

            List<?> choices = (List<?>) choicesObj;
            if (choices.isEmpty()) {
                log.error("AI response contained empty choices list");
                return "AI generation failed: no choices returned";
            }

            Object firstChoice = choices.get(0);
            if (!(firstChoice instanceof Map)) {
                log.error("Unexpected choice element type: {}", firstChoice);
                return "AI generation failed: unexpected response format";
            }

            Map<?, ?> firstChoiceMap = (Map<?, ?>) firstChoice;

            // Some APIs return message as a nested map, others return 'text' directly. Try both.
            Object messageObj = firstChoiceMap.get("message");
            String content = null;

            if (messageObj instanceof Map) {
                Object contentObj = ((Map<?, ?>) messageObj).get("content");
                if (contentObj != null) content = contentObj.toString();
            }

            if (content == null) {
                // fallback to 'text' or 'message' as string
                Object textFallback = firstChoiceMap.get("text");
                if (textFallback != null) content = textFallback.toString();
            }

            if (content == null) {
                log.error("Could not extract content from AI response: {}", body);
                return "AI generation failed: could not extract generated text";
            }

            return content;

        } catch (RestClientResponseException e) {
            // HTTP status errors (4xx,5xx) from the remote API — include response body for diagnostics
            String respBody = e.getResponseBodyAsString();
            // Some Spring versions expose different methods; use status text/message for portability
            String statusInfo = e.getStatusText() != null ? e.getStatusText() : e.getMessage();
            log.error("AI API returned HTTP error {} with body: {}", statusInfo, respBody, e);
            String bodySnippet = respBody != null && respBody.length() > 300 ? respBody.substring(0, 300) + "..." : respBody;
            return "AI generation failed: upstream service returned " + statusInfo + ". " + (bodySnippet != null ? bodySnippet : "");
        } catch (ResourceAccessException e) {
            // network I/O, timeouts, DNS failures, connection refused etc.
            log.error("Network/resource access error when calling AI API", e);
            return "AI generation failed: network error when contacting AI service.";
        } catch (Exception e) {
            log.error("Exception while calling AI API", e);
            return "AI generation failed. Please try again.";
        }
    }

    private String buildPrompt(Map<String, Object> payload) {
        Map<String, Object> profile = safeMap(payload.get("profile"));
        List<Map<String, Object>> education = safeListOfMap(payload.get("education"));
        List<Map<String, Object>> projects = safeListOfMap(payload.get("projects"));
        String skills = payload.get("skills") != null ? payload.get("skills").toString() : "";

        StringBuilder prompt = new StringBuilder();

        prompt.append("Create a professional resume with the following details:\n\n");

        prompt.append("Name: ").append(profile.getOrDefault("fullName", "")).append("\n");
        prompt.append("Email: ").append(profile.getOrDefault("email", "")).append("\n");
        prompt.append("Phone: ").append(profile.getOrDefault("phone", "")).append("\n\n");

        prompt.append("Education:\n");
        if (education != null) {
            for (Map<String, Object> edu : education) {
                prompt.append("- ")
                        .append(edu.getOrDefault("course", ""))
                        .append(" at ")
                        .append(edu.getOrDefault("institute", ""))
                        .append(" (")
                        .append(edu.getOrDefault("duration", ""))
                        .append(")\n");
            }
        }

        prompt.append("\nSkills:\n").append(skills).append("\n\n");

        prompt.append("Projects:\n");
        if (projects != null) {
            for (Map<String, Object> proj : projects) {
                prompt.append("- ")
                        .append(proj.getOrDefault("title", ""))
                        .append(": ")
                        .append(proj.getOrDefault("description", ""))
                        .append("\n");
            }
        }

        prompt.append("\nFormat with sections: Summary, Skills, Projects, Education.");

        return prompt.toString();
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> safeMap(Object obj) {
        if (obj instanceof Map) return (Map<String, Object>) obj;
        return Collections.emptyMap();
    }

    @SuppressWarnings("unchecked")
    private List<Map<String, Object>> safeListOfMap(Object obj) {
        if (obj instanceof List) return (List<Map<String, Object>>) obj;
        return Collections.emptyList();
    }
}