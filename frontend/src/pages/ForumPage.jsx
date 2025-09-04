import React, { useState } from "react";
import "../styles/forum.css";

function ForumPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPost, setNewPost] = useState("");
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null); // comment ID being replied to

  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Student #582",
      time: "30 minutes ago",
      text: "Feeling really burnt out with finals approaching. Anyone have tips for staying motivated?",
      likes: 12,
      comments: 0,
      commentList: [],
    },
    {
      id: 2,
      user: "Student #109",
      time: "about 3 hours ago",
      text: "Just wanted to share a small win – I finally finished a big project I was procrastinating on. It feels so good!",
      likes: 25,
      comments: 0,
      commentList: [],
    },
  ]);

  // === Create Post ===
  const handleCreatePost = () => {
    if (!newPost.trim()) return;
    const newEntry = {
      id: Date.now(),
      user: `Student #${Math.floor(Math.random() * 999)}`,
      time: "Just now",
      text: newPost.trim(),
      likes: 0,
      comments: 0,
      commentList: [],
    };
    setPosts([newEntry, ...posts]);
    setNewPost("");
    setIsModalOpen(false);
  };

  // === Like Post ===
  const handleLike = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  // === Open Comment Modal ===
  const handleOpenComments = (post) => {
    setSelectedPost(post);
    setNewComment("");
    setReplyText("");
    setReplyingTo(null);
    setIsCommentModalOpen(true);
  };

  // === Add Comment ===
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setPosts(
      posts.map((post) =>
        post.id === selectedPost.id
          ? {
              ...post,
              comments: post.comments + 1,
              commentList: [
                ...post.commentList,
                {
                  id: Date.now(),
                  user: `Anon #${Math.floor(Math.random() * 999)}`,
                  text: newComment.trim(),
                  replies: [],
                },
              ],
            }
          : post
      )
    );
    setNewComment("");
  };

  // === Add Reply ===
  const handleAddReply = (commentId) => {
    if (!replyText.trim()) return;
    setPosts(
      posts.map((post) =>
        post.id === selectedPost.id
          ? {
              ...post,
              commentList: post.commentList.map((c) =>
                c.id === commentId
                  ? {
                      ...c,
                      replies: [
                        ...c.replies,
                        {
                          id: Date.now(),
                          user: `Anon #${Math.floor(Math.random() * 999)}`,
                          text: replyText.trim(),
                        },
                      ],
                    }
                  : c
              ),
            }
          : post
      )
    );
    setReplyText("");
    setReplyingTo(null);
  };

  // === Delete Post ===
  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="forum-container">
      {/* Header */}
      <div className="forum-header">
        <div>
          <h1 className="forum-title">Peer Support Forum</h1>
          <p className="forum-subtitle">
            An anonymous space to share and connect with fellow students.
          </p>
        </div>
        <button
          className="create-post-btn"
          onClick={() => setIsModalOpen(true)}
        >
          + Create Post
        </button>
      </div>

      {/* Guidelines */}
      <div className="guidelines-card">
        <span className="guidelines-icon">⚠️</span>
        <p>
          <strong>Community Guidelines</strong> <br />
          This is a safe and supportive space. Please be respectful. Posts are
          moderated by AI to ensure safety.
        </p>
      </div>

      {/* Posts */}
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <div className="post-avatar">{post.user.charAt(0)}</div>
          <div className="post-content">
            <div className="post-header">
              <span>{post.user}</span>
              <span className="post-time">{post.time}</span>
            </div>
            <p className="post-text">{post.text}</p>
            <div className="post-actions">
              <span onClick={() => handleLike(post.id)} className="action-btn">
                ❤️ {post.likes}
              </span>
              <span
                onClick={() => handleOpenComments(post)}
                className="action-btn"
              >
                💬 {post.comments} Comments
              </span>
              <span
                onClick={() => handleDelete(post.id)}
                className="delete-btn"
              >
                🗑️ Delete
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Create Post Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="modal-title">Create a Post</h2>
            <textarea
              className="modal-textarea"
              placeholder="What's on your mind?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button className="submit-btn" onClick={handleCreatePost}>
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comments Modal */}
      {isCommentModalOpen && selectedPost && (
        <div className="modal-overlay">
          <div className="modal comments-modal">
            <h2 className="modal-title">Comments for {selectedPost.user}</h2>

            <div className="comments-list">
              {selectedPost.commentList.length > 0 ? (
                selectedPost.commentList.map((c) => (
                  <div key={c.id} className="comment-item">
                    <strong>{c.user}:</strong> {c.text}
                    <div className="comment-actions">
                      <span
                        className="reply-btn"
                        onClick={() => setReplyingTo(c.id)}
                      >
                        ↩ Reply
                      </span>
                    </div>

                    {/* Replies */}
                    {c.replies.length > 0 && (
                      <div className="replies-list">
                        {c.replies.map((r) => (
                          <div key={r.id} className="reply-item">
                            <strong>{r.user}:</strong> {r.text}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Box */}
                    {replyingTo === c.id && (
                      <div className="reply-box">
                        <textarea
                          className="reply-input"
                          placeholder="Write a reply..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                        <button
                          className="submit-btn"
                          onClick={() => handleAddReply(c.id)}
                        >
                          Reply
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="no-comments">No comments yet. Be the first!</p>
              )}
            </div>

            <textarea
              className="modal-textarea"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setIsCommentModalOpen(false)}
              >
                Close
              </button>
              <button className="submit-btn" onClick={handleAddComment}>
                Add Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForumPage;
