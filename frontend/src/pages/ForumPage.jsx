import React, { useState } from "react";
import { MessageSquare, ThumbsUp, MessageCircle, Shield } from "lucide-react";
import "../styles/forum.css";

function ForumPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      student: "Student #582",
      time: "30 minutes ago",
      content:
        "Feeling really burnt out with finals approaching. Anyone have tips for staying motivated?",
      likes: 12,
      comments: 4,
    },
    {
      id: 2,
      student: "Student #109",
      time: "about 3 hours ago",
      content:
        "Just wanted to share a small win – I finally finished a big project I was procrastinating on. It feels so good!",
      likes: 25,
      comments: 7,
    },
  ]);

  return (
    <div className="forum-container">
      <div className="forum-header">
        <div>
          <h2 className="forum-title">Peer Support Forum</h2>
          <p className="forum-subtitle">
            An anonymous space to share and connect with fellow students.
          </p>
        </div>
        <button className="create-post-btn">
          <MessageSquare size={16} />
          Create Post
        </button>
      </div>

      {/* Community Guidelines */}
      <div className="guidelines-card">
        <Shield size={18} className="guidelines-icon" />
        <div>
          <strong>Community Guidelines</strong>
          <p>
            This is a safe and supportive space. Please be respectful. Posts are
            moderated by AI to ensure safety.
          </p>
        </div>
      </div>

      {/* Posts List */}
      <div className="posts-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-avatar">{post.id * 1}</div>
            <div className="post-content">
              <div className="post-header">
                <strong>{post.student}</strong>
                <span className="post-time">{post.time}</span>
              </div>
              <p className="post-text">{post.content}</p>
              <div className="post-actions">
                <span>
                  <ThumbsUp size={16} /> {post.likes}
                </span>
                <span>
                  <MessageCircle size={16} /> {post.comments}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForumPage;
