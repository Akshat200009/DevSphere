package com.Reddit.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Reddit.Entities.Community;
import com.Reddit.Repository.CommunityRepository;

@Service
public class CommunityService {

    @Autowired
    private CommunityRepository repository;

    public Community createCommunity(Community community) {

        return repository.save(community);
    }

    public List<Community> getAllCommunities() {

        return repository.findAll();
    }
}