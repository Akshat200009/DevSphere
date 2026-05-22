package com.Reddit.Services;

import com.Reddit.Entities.Comment;
import com.Reddit.Entities.Post;
import com.Reddit.Repository.CommentRepository;
import com.Reddit.Repository.PostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    public String addComment(Long postId, Comment comment) {

        Post post = postRepository.findById(postId).orElse(null);

        if (post == null) {
            return "Post not found";
        }

        comment.setPost(post);

        commentRepository.save(comment);

        return "Comment added successfully";
    }


    public List<Comment> getCommentsByPost(
            Long postId
    ) {

        Post post = postRepository
                .findById(postId)
                .orElse(null);

        if (post == null) {

            return List.of();
        }

        return commentRepository
                .findByPost(post);
    }
    
}