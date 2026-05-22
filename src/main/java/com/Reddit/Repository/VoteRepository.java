package com.Reddit.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.Reddit.Entities.Post;
import com.Reddit.Entities.Vote;

import jakarta.transaction.Transactional;

public interface VoteRepository extends JpaRepository<Vote, Long> {

	Optional<Vote> findByUsernameAndPost(String username, Post post);
	 @Transactional
	    @Modifying
    void deleteByPostId(Long postId);


}
