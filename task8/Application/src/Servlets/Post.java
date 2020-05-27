package Servlets;

import java.util.*;

public class Post {
    private String id;
    private String description;
    private Date createdAt;
    private String author;
    private String photoLink;
    private Set<String> hashTags;
    private Set<String> likes;

    public Post(String id, String description, Date createdAt, String author,
                String photoLink, Set<String> hashTags, Set<String> likes) {
        this.id = id;
        this.description = description;
        this.createdAt = createdAt;
        this.author = author;
        this.photoLink = photoLink;
        this.hashTags = new HashSet<>(hashTags);
        this.likes = new HashSet<>(likes);
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPhotoLink(String photoLink) {
        this.photoLink = photoLink;
    }

    public void setHashTags(Set<String> hashTags) {
        this.hashTags.clear();
        this.hashTags.addAll(hashTags);
    }

    public void setLikes(Set<String> likes) {
        this.likes.clear();
        this.likes.addAll(likes);
    }

    public String getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public String getAuthor() {
        return author;
    }

    public String getPhotoLink() {
        return photoLink;
    }

    public Set<String> getHashTags() {
        return hashTags;
    }

    public Set<String> getLikes() {
        return likes;
    }

    public Integer getCountLikes() {
        return likes.size();
    }

    public boolean validate() {
        return this.getId() != null && this.getId().length() != 0 &&
                this.getDescription() != null && this.getDescription().length() < 200 &&
                this.getCreatedAt() != null &&
                this.getAuthor() != null && this.getAuthor().length() != 0;
    }

    public void like(String author) {
        if (author == null) {
            return;
        }

        for (String i : likes) {
            if (i.equals(author)) {
                likes.remove(i);
            }
            return;
        }

        likes.add(author);
    }
}
