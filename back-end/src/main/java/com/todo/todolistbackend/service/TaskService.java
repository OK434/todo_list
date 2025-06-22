package com.todo.todolistbackend.service;

import com.todo.todolistbackend.dto.request.TaskRequestDto;
import com.todo.todolistbackend.entity.Project;
import com.todo.todolistbackend.entity.Task;
import com.todo.todolistbackend.exceptions.ProjectNotFoundException;
import com.todo.todolistbackend.exceptions.TaskNotFoundException;
import com.todo.todolistbackend.repository.ProjectRepository;
import com.todo.todolistbackend.repository.TaskRepository;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    public TaskService(TaskRepository taskRepository , ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }

    public Task addTask(TaskRequestDto requestDto,Long projectId) {

        Project project = projectRepository.findById(projectId).orElseThrow(
                () -> new ProjectNotFoundException("Project with id "+ projectId + " not found"));

        Task task = new Task();
        task.setDescription(requestDto.getDescription());
        task.setProject(project);
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        if(!taskRepository.existsById(id)) {
            throw new TaskNotFoundException("Task with id " + id + " not found");
        }
        taskRepository.deleteById(id);
    }


}
