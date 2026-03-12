package com.todo.todolistbackend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginRequestDto {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 3, max = 30)
    private String password;

}
