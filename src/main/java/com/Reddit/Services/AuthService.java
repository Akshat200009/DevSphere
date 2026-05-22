package com.Reddit.Services;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.Reddit.Entities.User;

import com.Reddit.Repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public String register(User user) {

        // CHECK EMAIL EXISTS

        if (userRepository
                .findByEmail(
                        user.getEmail()
                )
                .isPresent()) {

            return "Email already exists";
        }

        // SAVE USER

        userRepository.save(user);

        return "User Registered Successfully";
    }
}