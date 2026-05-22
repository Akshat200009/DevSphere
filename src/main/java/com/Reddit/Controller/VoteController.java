package com.Reddit.Controller;

import com.Reddit.Entities.Vote;
import com.Reddit.Services.VoteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vote")
@CrossOrigin("*")
public class VoteController {

    @Autowired
    private VoteService voteService;

    @PostMapping("/{postId}")
    public String votePost(
            @PathVariable Long postId,
            @RequestBody Vote vote
    ) {

        return voteService.votePost(postId, vote);
    }

    @GetMapping("/count/{postId}")
    public int getVotes(@PathVariable Long postId) {

        return voteService.getVoteCount(postId);
    }
}