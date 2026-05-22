package com.Reddit.Controller;

import com.Reddit.Entities.Comment;
import com.Reddit.Services.CommentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
@CrossOrigin("*")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/{postId}")
    public String addComment(
            @PathVariable Long postId,
            @RequestBody Comment comment
    ) {

        return commentService.addComment(postId, comment);
    }

    @GetMapping("/{postId}")
    public List<Comment> getComments(
            @PathVariable Long postId
    ) {

        return commentService.getCommentsByPost(postId);
    }
    @GetMapping("/post/{postId}")

    public List<Comment> getCommentsByPost(
            @PathVariable Long postId
    ) {

        return commentService
                .getCommentsByPost(postId);
    }
}