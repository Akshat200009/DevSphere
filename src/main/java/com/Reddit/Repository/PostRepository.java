package com.Reddit.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Reddit.Entities.Post;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByCommunityId(Long communityId);

    List<Post> findAllByOrderByIdDesc();
    

    List<Post> findAllByOrderByVoteCountDesc();
    
    List<Post> findByCommunityIdOrderByIdDesc(
            Long communityId
    );

}
