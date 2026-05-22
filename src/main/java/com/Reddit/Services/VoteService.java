package com.Reddit.Services;

import com.Reddit.Entities.Post;
import com.Reddit.Entities.Vote;
import com.Reddit.Repository.PostRepository;
import com.Reddit.Repository.VoteRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private PostRepository postRepository;

    public String votePost(Long postId, Vote voteRequest) {

        Post post = postRepository.findById(postId).orElse(null);

        if (post == null) {
            return "Post not found";
        }

        Vote existingVote =
                voteRepository.findByUsernameAndPost(
                        voteRequest.getUsername(),
                        post
                ).orElse(null);

   
        if (existingVote != null) {

            existingVote.setType(voteRequest.getType());

            voteRepository.save(existingVote);

            return "Vote updated";
        }

        voteRequest.setPost(post);

        voteRepository.save(voteRequest);

        return "Vote added";
    }

    public int getVoteCount(Long postId) {

        List<Vote> votes = voteRepository.findAll();

        int count = 0;

        for (Vote vote : votes) {

            if (vote.getPost() == null) {
                continue;
            }

            // match current post
            if (vote.getPost().getId().equals(postId)) {

                if (vote.getType().equalsIgnoreCase("UPVOTE")) {

                    count++;

                } else {

                    count--;
                }
            }
        }

        return count;
    }
    }