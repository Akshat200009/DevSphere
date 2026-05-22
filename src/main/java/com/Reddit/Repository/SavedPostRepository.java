package com.Reddit.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.Reddit.Entities.SavedPost;

import jakarta.transaction.Transactional;

public interface SavedPostRepository
        extends JpaRepository<SavedPost, Long> {

    List<SavedPost>
    findByUsername(String username);
    
    @Transactional
    @Modifying
    void deleteByPostId(Long postId);

}