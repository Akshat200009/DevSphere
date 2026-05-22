package com.Reddit.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.Reddit.Entities.User;

import com.Reddit.Repository.UserRepository;

import com.Reddit.Security.JwtUtil;

import com.Reddit.Services.AuthService;

@RestController

@RequestMapping("/auth")

@CrossOrigin("*")

public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    // REGISTER

    @PostMapping("/register")

    public String register(
            @RequestBody User user
    ) {

        return authService.register(user);
    }

    // LOGIN

    @PostMapping("/login")

    public Map<String, Object> login(
            @RequestBody User user
    ) {

        // FIND USER

        User dbUser =

                userRepository
                .findByEmail(
                        user.getEmail()
                )
                .orElse(null);

        // USER NOT FOUND

        if (dbUser == null) {

            return null;
        }

        // PASSWORD CHECK

        if (!dbUser
                .getPassword()
                .equals(
                        user.getPassword()
                )) {

            return null;
        }

        // GENERATE TOKEN

        String token =

                jwtUtil.generateToken(
                        dbUser.getEmail()
                );

        // RESPONSE

        Map<String, Object>
                response =
                new HashMap<>();

        response.put(
                "token",
                token
        );

        response.put(
                "username",
                dbUser.getName()
        );

        response.put(
                "email",
                dbUser.getEmail()
        );

        return response;
    }
}