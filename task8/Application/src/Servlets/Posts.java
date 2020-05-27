package Servlets;

import java.util.*;

public class Posts {
    private List<Post> posts = new LinkedList<>();
    private List<Post> archivePosts = new LinkedList<>();

    public Posts() {
        Set<String> hashTags = new HashSet<>();
        hashTags.add("tag1");
        hashTags.add("tag2");

        Set<String> likes = new HashSet<>();
        likes.add("like1");
        likes.add("like2");

        add(new Post("1", "1", new Date(), "Igor Shapiro", "1.png",
                hashTags, likes));

        add(new Post("2", "2", new Date(), "notIS N", "2.png",
                hashTags, likes));
    }

    public Post getPost(String id) {
        for (Post post: posts) {
            if (post.getId().equals(id)) {
                return post;
            }
        }

        return null;
    }

    public boolean add(Post post) {
        if (post.validate()) {
            posts.add(post);

            return true;
        }

        return false;
    }

    public boolean remove(String id) {
        for (Post post: posts) {
            if (post.getId().equals(id)) {
                archivePosts.add(new Post(post.getId(), post.getDescription(), post.getCreatedAt(), post.getAuthor(),
                        post.getPhotoLink(), post.getHashTags(), post.getLikes()));
                posts.remove(post);

                return true;
            }
        }

        return false;
    }

    public boolean edit(String id, Post post) {
        if (post == null || post.getId() != null || post.getAuthor() != null || post.getCreatedAt() != null ||
                post.getLikes() != null) {
            return false;
        }

        Post editingPost = getPost(id);
        if (editingPost == null) {
            return false;
        }
        archivePosts.add(new Post(editingPost.getId(), editingPost.getDescription(), editingPost.getCreatedAt(),
                editingPost.getAuthor(), editingPost.getPhotoLink(), editingPost.getHashTags(),
                editingPost.getLikes()));

        if (post.getDescription() != null) {
            editingPost.setDescription(post.getDescription());
        }

        if (post.getPhotoLink() != null) {
            editingPost.setPhotoLink(post.getPhotoLink());
        }

        if (post.getHashTags() != null) {
            editingPost.setHashTags(post.getHashTags());
        }

        return true;
    }

    public List<Post> getAll() {
        return posts;
    }

    public void clear() {
        archivePosts.addAll(posts);

        posts.clear();
    }

}
