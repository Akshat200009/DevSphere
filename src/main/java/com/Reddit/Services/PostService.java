package com.Reddit.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Reddit.Entities.Community;
import com.Reddit.Entities.Post;
import com.Reddit.Entities.SavedPost;
import com.Reddit.Repository.CommentRepository;
import com.Reddit.Repository.CommunityRepository;
import com.Reddit.Repository.PostRepository;
import com.Reddit.Repository.SavedPostRepository;
import com.Reddit.Repository.VoteRepository;

import jakarta.transaction.Transactional;

@Service
public class PostService {

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private VoteRepository voteRepository;
	
	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private CommunityRepository communityRepository;
	
	@Autowired
	private SavedPostRepository
	        savedPostRepository;

	public Post createPost(Post post, Long communityId) {

		Community community = communityRepository.findById(communityId)
				.orElseThrow(() -> new RuntimeException("Community not found"));

		post.setCommunity(community);

		return postRepository.save(post);
	}

	public List<Post> getPostsByCommunity(Long communityId) {

		return postRepository.findByCommunityId(communityId);
	}

	public List<Post> getLatestPosts() {

		return postRepository.findAllByOrderByIdDesc();
	}

	public List<Post> getPopularPosts() {

		return postRepository.findAllByOrderByVoteCountDesc();
	}

	public List<Post> getLatestPostsByCommunity(Long communityId) {

		return postRepository.findByCommunityIdOrderByIdDesc(communityId);
	}

	public Post upvotePost(Long id) {

		Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));

		post.setVoteCount(post.getVoteCount() + 1);

		return postRepository.save(post);
	}

	public Post downvotePost(Long id) {

		Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));

		post.setVoteCount(post.getVoteCount() - 1);

		return postRepository.save(post);
	}

	@Transactional
	public void deletePost(Long id) {

	    commentRepository
	            .deleteByPostId(id);


	    voteRepository
	            .deleteByPostId(id);


	    savedPostRepository
	            .deleteByPostId(id);


	    postRepository.deleteById(id);
	}
	public void savePost(
	        Long postId,
	        String username
	) {

	    Post post =
	            postRepository.findById(postId)
	                    .orElseThrow(() ->
	                            new RuntimeException(
	                                    "Post not found"
	                            ));

	    SavedPost savedPost =
	            new SavedPost();

	    savedPost.setPost(post);

	    savedPost.setUsername(username);

	    savedPostRepository.save(savedPost);
	}
	public List<SavedPost>
	getSavedPosts(String username) {

	    return savedPostRepository
	            .findByUsername(username);
	}
}