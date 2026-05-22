package com.Reddit.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.Reddit.Entities.Community;
import com.Reddit.Repository.CommunityRepository;
import com.Reddit.Services.CommunityService;

@RestController
@RequestMapping("/community")
@CrossOrigin("*")
public class CommunityController {

    @Autowired
    private CommunityService service;
    
    @Autowired
    private CommunityRepository communityRepository;

    @PostMapping("/create")
    public Community createCommunity(
            @RequestBody Community community) {

        return service.createCommunity(community);
    }

    @GetMapping("/all")
    public List<Community> getAllCommunities() {

        return service.getAllCommunities();
    }
    @GetMapping("/{id}")

    public Community getCommunityById(
            @PathVariable Long id
    ) {

        return communityRepository
                .findById(id)
                .orElse(null);
    }
}