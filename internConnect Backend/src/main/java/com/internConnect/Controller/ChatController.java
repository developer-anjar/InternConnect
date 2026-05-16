package com.internConnect.Controller;

import com.internConnect.service.ChatService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public Map<String, String> chat(@RequestBody Map<String, Object> request) {

        String message = (String) request.get("message");
        Long studentId = Long.valueOf(request.get("studentId").toString());

        String reply = chatService.getResponse(message, studentId);

        return Map.of("reply", reply);
    }
}