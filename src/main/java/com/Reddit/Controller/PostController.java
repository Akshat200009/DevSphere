package com.Reddit.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.Reddit.Entities.Post;
import com.Reddit.Entities.SavedPost;
import com.Reddit.Repository.PostRepository;
import com.Reddit.Services.PostService;

@RestController
@RequestMapping("/post")
@CrossOrigin("*")
public class PostController {

    @Autowired
    private PostService service;
    
    @Autowired
    private PostRepository postRepository;

    @PostMapping("/create/{communityId}")
    public Post createPost(
            @RequestBody Post post,
            @PathVariable Long communityId) {

        return service.createPost(post, communityId);
    }

    @GetMapping("/community/{communityId}")
    public List<Post> getPostsByCommunity(
            @PathVariable Long communityId) {

        return service.getPostsByCommunity(communityId);
    }
    @GetMapping("/latest")
    public List<Post> getlatestPosts() {

        return service.getLatestPosts();
    }

    @GetMapping("/popular")
    public List<Post> popularPosts() {

        return service.getPopularPosts();
    }
    @GetMapping("/latest/{communityId}")

    public List<Post> getLatestPostsByCommunity(
            @PathVariable Long communityId
    ) {

        return service.getLatestPostsByCommunity(
                communityId
        );
    }
    @PostMapping("/upvote/{id}")
    public Post upvotePost(
            @PathVariable Long id
    ) {

        return service.upvotePost(id);
    }

    @PostMapping("/downvote/{id}")
    public Post downvotePost(
            @PathVariable Long id
    ) {

        return service.downvotePost(id);
    }
    @DeleteMapping("/delete/{id}")
    public String deletePost(
            @PathVariable Long id
    ) {

        service.deletePost(id);

        return "Post deleted successfully";
    }
    @PostMapping("/save/{postId}")
    public String savePost(
            @PathVariable Long postId
    ) {

        service.savePost(
                postId,
                "Akshat"
        );

        return "Post saved";
    }
    @GetMapping("/saved")
    public List<SavedPost>
    getSavedPosts() {

        return service.getSavedPosts(
                "Akshat"
        );
    }
    @GetMapping("/all")
    public List<Post> getAllPosts() {

        return postRepository.findAll();
    }
}