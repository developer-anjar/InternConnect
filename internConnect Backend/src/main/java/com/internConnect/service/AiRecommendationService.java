package com.internConnect.service;

import com.internConnect.Entity.*;
import com.internConnect.Dao.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AiRecommendationService {

    private final InternshipRepository internshipRepo;
    private final SkillRepository skillRepo;
    private final EducationRepository educationRepo;

    public AiRecommendationService(InternshipRepository internshipRepo,
                                   SkillRepository skillRepo,
                                   EducationRepository educationRepo) {
        this.internshipRepo = internshipRepo;
        this.skillRepo = skillRepo;
        this.educationRepo = educationRepo;
    }

    public List<Map<String, Object>> getRecommendations(Long studentId) {

        List<Skill> skills = skillRepo.findByStudentStudentId(studentId);
        List<Education> educationList = educationRepo.findByStudentStudentId(studentId);
        List<Internship> internships = internshipRepo.findAll();

        List<String> studentSkills = skills.stream()
                .map(s -> s.getSkillName().toLowerCase())
                .collect(Collectors.toList());

        String qualification = educationList.size() > 0
                ? educationList.get(0).getCourse().toLowerCase()
                : "";

        List<Map<String, Object>> result = new ArrayList<>();

        for (Internship internship : internships) {

            int score = 0;

            List<String> internshipSkills = Arrays.asList(
                    internship.getSkills().toLowerCase().split(",")
            );

            boolean skillMatch = studentSkills.stream()
                    .anyMatch(internshipSkills::contains);

            boolean qualMatch = internship.getQualification()
                    .toLowerCase()
                    .contains(qualification);

            if (skillMatch) score += 70;
            if (qualMatch) score += 30;

            if (score > 0) {
                Map<String, Object> map = new HashMap<>();
                map.put("internshipId", internship.getInternshipId());
                map.put("internshipTitle", internship.getInternshipTitle());
                map.put("companyName", internship.getCompanyName());
                map.put("companyLocation", internship.getCompanyLocation());
                map.put("stipend", internship.getStipend());
                map.put("skills", internship.getSkills());
                map.put("score", score);

                result.add(map);
            }
        }

        return result.stream()
                .sorted((a, b) -> (int)b.get("score") - (int)a.get("score"))
                .limit(5)
                .collect(Collectors.toList());
    }
}