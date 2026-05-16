package com.internConnect.Controller;

import com.internConnect.Entity.Project;
import com.internConnect.service.ProjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:4200")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    // ✅ Save single project
    @PostMapping("/{studentId}")
    public Project saveProject(@PathVariable Long studentId,
                               @RequestBody Project project) {
        return projectService.saveProject(studentId, project);
    }

    // ✅ Get all projects
    @GetMapping("/{studentId}")
    public List<Project> getProjects(@PathVariable Long studentId) {
        return projectService.getProjects(studentId);
    }
}