package com.todo.todolistbackend.service;

import com.todo.todolistbackend.dto.request.ProjectDetailsRequestDto;
import com.todo.todolistbackend.entity.Project;
import com.todo.todolistbackend.entity.User;
import com.todo.todolistbackend.exceptions.EmptyListException;
import com.todo.todolistbackend.exceptions.ProjectNotFoundException;
import com.todo.todolistbackend.exceptions.UserNotFoundException;
import com.todo.todolistbackend.repository.ProjectRepository;
import com.todo.todolistbackend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public Project addProject(ProjectDetailsRequestDto requestDto, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Project project = new Project();
        project.setTitle(requestDto.getTitle());
        project.setDescription(requestDto.getDescription());
        project.setDate(requestDto.getDate());
        project.setUser(user);

        return projectRepository.save(project);
    }


    public List<Project> getAllProjectsWithUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("User with id " + userId + " not found"));

       List<Project> projects = projectRepository.findByUserWithTasks(user);

       if (projects.isEmpty()) {
           throw new EmptyListException("Empty list");
       }

       return projects;
    }

    public void deleteProject(Long projectId) {
        if (!projectRepository.existsById(projectId)) {
          throw new ProjectNotFoundException("Project with id " + projectId + " not found");
        }
        projectRepository.deleteById(projectId);
    }


}
