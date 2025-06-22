package com.todo.todolistbackend.controller;

import com.todo.todolistbackend.dto.request.LoginRequestDto;
import com.todo.todolistbackend.dto.request.RegisterRequestDto;
import com.todo.todolistbackend.dto.response.UserResponseDto;
import com.todo.todolistbackend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDto> login(@Valid @RequestBody LoginRequestDto loginRequestDto) {
        UserResponseDto response = userService.loginUser(loginRequestDto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> register(@Valid @RequestBody RegisterRequestDto registerRequestDto) {
        UserResponseDto response = userService.registerUser(registerRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        userService.deleteUser(id);

        return "User deleted";
    }
}
