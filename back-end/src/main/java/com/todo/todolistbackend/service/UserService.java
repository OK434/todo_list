package com.todo.todolistbackend.service;

import com.todo.todolistbackend.dto.mapper.UserMapper;
import com.todo.todolistbackend.dto.request.LoginRequestDto;
import com.todo.todolistbackend.dto.request.RegisterRequestDto;
import com.todo.todolistbackend.dto.response.UserResponseDto;
import com.todo.todolistbackend.entity.User;
import com.todo.todolistbackend.exceptions.UserAlreadyRegisteredException;
import com.todo.todolistbackend.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final AuthenticationManager authenticationManager;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       UserMapper userMapper,
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
        this.authenticationManager = authenticationManager;
    }

    public UserResponseDto registerUser(RegisterRequestDto requestDto) {
        if (userRepository.findByEmail(requestDto.getEmail()).isPresent()) {
            throw new UserAlreadyRegisteredException("User with email " + requestDto.getEmail() + " already exists");
        }

        if (!Objects.equals(requestDto.getPassword(), requestDto.getConfirmPassword())) {
            throw new BadCredentialsException("Passwords do not match");
        }

        User user = new User();
        user.setEmail(requestDto.getEmail());
        user.setPassword(passwordEncoder.encode(requestDto.getPassword()));

        User savedUser = userRepository.save(user);
        return userMapper.toUserResponseDto(savedUser);
    }

    public UserResponseDto loginUser(LoginRequestDto requestDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            requestDto.getEmail(),
                            requestDto.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            User user = userRepository.findByEmail(requestDto.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            return userMapper.toUserResponseDto(user);

        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid email or password");
        }
    }

    //Omar habibi this one is just for me, maybe later we'll add a feature that will make the user delete his profile
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
}
