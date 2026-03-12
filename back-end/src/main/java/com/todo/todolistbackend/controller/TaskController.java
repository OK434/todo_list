package com.todo.todolistbackend.controller;

import com.todo.todolistbackend.dto.request.TaskRequestDto;
import com.todo.todolistbackend.entity.Task;
import com.todo.todolistbackend.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/add/{projectId}")
    public ResponseEntity<Task> addTask(@Valid @RequestBody TaskRequestDto requestDto,@PathVariable Long projectId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(taskService.addTask(requestDto,projectId));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Task> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
