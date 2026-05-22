package com.Reddit.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.Reddit.Entities.Comment;
import com.Reddit.Entities.Post;

import jakarta.transaction.Transactional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

	List<Comment> findByPost(Post post);
	@Transactional
    @Modifying
    void deleteByPostId(Long postId);


}
