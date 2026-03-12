package com.todo.todolistbackend.controller;

import com.todo.todolistbackend.config.securityconfig.CustomUserPrincipal;
import com.todo.todolistbackend.dto.request.ProjectDetailsRequestDto;
import com.todo.todolistbackend.entity.Project;
import com.todo.todolistbackend.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjectsForCurrentUser(@AuthenticationPrincipal CustomUserPrincipal principal) {
        Long userId = principal.getUserId();
        return ResponseEntity.ok(projectService.getAllProjectsWithUserId(userId));
    }

    @PostMapping("/add")
    public ResponseEntity<Project> addProject(@AuthenticationPrincipal CustomUserPrincipal principal,
                                              @Valid @RequestBody ProjectDetailsRequestDto requestDto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(projectService.addProject(requestDto, principal.getUserId()));
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Project> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

    }

}
