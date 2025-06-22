package com.todo.todolistbackend.dto.response;

import java.time.LocalDateTime;

public record UserResponseDto(
        String username,
        LocalDateTime createdAt
) {
}
