package com.Reddit.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Reddit.Entities.Community;

public interface CommunityRepository extends JpaRepository<Community, Long>{

}
