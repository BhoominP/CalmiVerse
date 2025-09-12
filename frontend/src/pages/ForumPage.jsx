"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/useToast";
import { MessageSquare, Heart, Trash2, Reply } from "lucide-react";

// ------------------------------
// Mock moderation (replace later)
// ------------------------------
async function moderatePost({ text }) {
  // Fake logic: flag if text has "bad" in it
  if (text.toLowerCase().includes("bad")) {
    return { isHarmful: true, reason: "Contains inappropriate language" };
  }
  return { isHarmful: false, reason: "" };
}

export default function ForumPage() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPost, setNewPost] = useState("");
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

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
  const handleCreatePost = async () => {
    if (!newPost.trim()) return;

    const moderationResult = await moderatePost({ text: newPost });
    if (moderationResult.isHarmful) {
      toast({
        variant: "destructive",
        title: "Post Flagged",
        description: `Reason: ${moderationResult.reason}`,
      });
      return;
    }

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
    toast({ title: "Post Created", description: "Your post was added." });
  };

  // === Like Post ===
  const handleLike = (id) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)));
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
  const handleAddComment = async () => {
    if (!newComment.trim() || !selectedPost) return;

    const moderationResult = await moderatePost({ text: newComment });
    if (moderationResult.isHarmful) {
      toast({
        variant: "destructive",
        title: "Comment Flagged",
        description: `Reason: ${moderationResult.reason}`,
      });
      return;
    }

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
    toast({ title: "Comment Added", description: "Your comment was added." });
  };

  // === Add Reply ===
  const handleAddReply = async (commentId) => {
    if (!replyText.trim() || !selectedPost) return;

    const moderationResult = await moderatePost({ text: replyText });
    if (moderationResult.isHarmful) {
      toast({
        variant: "destructive",
        title: "Reply Flagged",
        description: `Reason: ${moderationResult.reason}`,
      });
      return;
    }

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
    toast({ title: "Reply Added", description: "Your reply was added." });
  };

  // === Delete Post ===
  const handleDelete = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
    toast({ title: "Post Deleted", description: "The post was removed." });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Peer Support Forum</h1>
          <p className="text-muted-foreground">
            An anonymous space to share and connect with fellow students.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Create Post</Button>
      </div>

      {/* Guidelines */}
      <Alert>
        <AlertTitle>Community Guidelines</AlertTitle>
        <AlertDescription>
          This is a safe and supportive space. Please be respectful. Posts,
          comments, and replies are moderated by AI.
        </AlertDescription>
      </Alert>

      {/* Posts */}
      {posts.map((post) => (
        <Card key={post.id}>
          <CardContent className="p-4 flex gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
              {post.user.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{post.user}</span>
                <span className="text-sm text-muted-foreground">
                  {post.time}
                </span>
              </div>
              <p className="mt-2">{post.text}</p>
              <div className="flex gap-4 mt-3 text-sm">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  <Heart size={16} /> {post.likes}
                </button>
                <button
                  onClick={() => handleOpenComments(post)}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  <MessageSquare size={16} /> {post.comments} Comments
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="flex items-center gap-1 text-red-500"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Create Post Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Post</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <Button onClick={handleCreatePost} className="mt-3">
            Post
          </Button>
        </DialogContent>
      </Dialog>

      {/* Comments Modal */}
      <Dialog open={isCommentModalOpen} onOpenChange={setIsCommentModalOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Comments for {selectedPost?.user}</DialogTitle>
          </DialogHeader>

          {selectedPost?.commentList.length > 0 ? (
            selectedPost.commentList.map((c) => (
              <div key={c.id} className="border-b pb-2 mb-2">
                <p>
                  <strong>{c.user}:</strong> {c.text}
                </p>
                <button
                  className="text-xs text-primary flex items-center gap-1 mt-1"
                  onClick={() => setReplyingTo(c.id)}
                >
                  <Reply size={12} /> Reply
                </button>

                {/* Replies */}
                {c.replies.length > 0 && (
                  <div className="ml-4 mt-2 space-y-1">
                    {c.replies.map((r) => (
                      <p key={r.id} className="text-sm">
                        <strong>{r.user}:</strong> {r.text}
                      </p>
                    ))}
                  </div>
                )}

                {/* Reply Box */}
                {replyingTo === c.id && (
                  <div className="mt-2 space-y-2">
                    <Input
                      placeholder="Write a reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <Button size="sm" onClick={() => handleAddReply(c.id)}>
                      Reply
                    </Button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No comments yet. Be the first!
            </p>
          )}

          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={handleAddComment} className="mt-3">
            Add Comment
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
