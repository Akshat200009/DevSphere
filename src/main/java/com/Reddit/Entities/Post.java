package com.Reddit.Entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Post {

    @Id
    @GeneratedValue(
            strategy =
            GenerationType.IDENTITY
    )
    private Long id;

    private String title;

    private String content;

    private String authorName;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    private int voteCount;

    // COMMUNITY

    @ManyToOne

    @JoinColumn(
            name = "community_id"
    )

    @JsonIgnoreProperties("posts")

    private Community community;

    // COMMENTS

    @OneToMany(
            mappedBy = "post",
            cascade =
            CascadeType.ALL
    )

    @JsonIgnoreProperties("post")

    private List<Comment> comments;

    // GETTERS & SETTERS

    public Long getId() {

        return id;
    }

    public void setId(Long id) {

        this.id = id;
    }

    public String getTitle() {

        return title;
    }

    public void setTitle(String title) {

        this.title = title;
    }

    public String getContent() {

        return content;
    }

    public void setContent(
            String content
    ) {

        this.content = content;
    }

    public String getAuthorName() {

        return authorName;
    }

    public void setAuthorName(
            String authorName
    ) {

        this.authorName =
                authorName;
    }

    public String getImageUrl() {

        return imageUrl;
    }

    public void setImageUrl(
            String imageUrl
    ) {

        this.imageUrl =
                imageUrl;
    }

    public int getVoteCount() {

        return voteCount;
    }

    public void setVoteCount(
            int voteCount
    ) {

        this.voteCount =
                voteCount;
    }

    public Community getCommunity() {

        return community;
    }

    public void setCommunity(
            Community community
    ) {

        this.community =
                community;
    }

    public List<Comment> getComments() {

        return comments;
    }

    public void setComments(
            List<Comment> comments
    ) {

        this.comments =
                comments;
    }
}