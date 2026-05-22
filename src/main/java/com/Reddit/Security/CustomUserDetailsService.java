package com.Reddit.Security;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.User;

import org.springframework.security.core.userdetails
        .UserDetails;

import org.springframework.security.core.userdetails
        .UserDetailsService;

import org.springframework.security.core.userdetails
        .UsernameNotFoundException;

import org.springframework.stereotype.Service;

import com.Reddit.Entities.*;

import com.Reddit.Repository.UserRepository;

@Service
public class CustomUserDetailsService
        implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(
            String email
    ) throws UsernameNotFoundException {

        com.Reddit.Entities.User user =

                userRepository
                .findByEmail(email)
                .orElseThrow(() ->

                        new UsernameNotFoundException(
                                "User not found"
                        )
                );

        return new User(

                user.getEmail(),

                user.getPassword(),

                Collections.emptyList()
        );
    }
}