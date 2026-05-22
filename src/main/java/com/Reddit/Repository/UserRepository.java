package com.Reddit.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Reddit.Entities.User;

public interface UserRepository extends JpaRepository<User, Long> {


    Optional<User> findByEmail(String email);

}
