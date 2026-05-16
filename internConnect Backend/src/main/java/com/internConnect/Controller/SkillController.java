package com.internConnect.Controller;

import com.internConnect.Entity.Skill;
import com.internConnect.service.SkillService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "http://localhost:4200")
public class SkillController {

    @Autowired
    private SkillService skillService;

    // Save skills (comma string)
    @PostMapping("/{studentId}")
    public void saveSkills(@PathVariable Long studentId,
                           @RequestBody String skills) {

        List<String> skillList = Arrays.asList(skills.split(","));
        skillService.saveSkills(studentId, skillList);
    }

    // Get skills
    @GetMapping("/{studentId}")
    public List<Skill> getSkills(@PathVariable Long studentId) {
        return skillService.getSkills(studentId);
    }
}