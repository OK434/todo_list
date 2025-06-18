package com.todo.todolistbackend.dto.mapper;

import com.todo.todolistbackend.dto.request.RegisterRequestDto;
import com.todo.todolistbackend.dto.response.UserResponseDto;
import com.todo.todolistbackend.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponseDto toUserResponseDto(User user) {
        return new UserResponseDto(
                user.getEmail(),
                user.getCreatedAt()
        );
    }

}
