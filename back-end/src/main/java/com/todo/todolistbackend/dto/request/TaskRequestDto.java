package com.todo.todolistbackend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TaskRequestDto {
    @NotBlank
    private String description;
}
