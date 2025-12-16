'use client';

import React, { useState, useMemo } from 'react';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';
import './Community.css';

interface Post {
  id: number;
  username: string;
  avatar: string;
  content: string;
  hashtags: string[];
  likes: number;
  comments: number;
  liked: boolean;
  image: string | null;
  timestamp: string;
}

const Community: React.FC = () => {
  const router = useRouter();
  const [showCreatePost, setShowCreatePost] = useState<boolean>(false);
  const [newPostContent, setNewPostContent] = useState<string>('');
  const [newPostHashtags, setNewPostHashtags] = useState<string>('');
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [usernameFilter, setUsernameFilter] = useState<string>('');
  const [sortFilter, setSortFilter] = useState<string>('most-recent');

  // Dummy hockey posts data
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      username: 'HockeyPro23',
      avatar: 'H',
      content: 'Just scored my first hat trick in the league championship! 🏒🎉',
      hashtags: ['#hockey', '#hattrick', '#championship'],
      likes: 124,
      comments: 18,
      liked: false,
      image: null,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      username: 'IceWarrior',
      avatar: 'I',
      content: 'Morning practice at 6am. Dedication is everything. Who else is up early?',
      hashtags: ['#earlybird', '#practice', '#dedication'],
      likes: 89,
      comments: 12,
      liked: true,
      image: null,
      timestamp: '5 hours ago'
    },
    {
      id: 3,
      username: 'PuckMaster',
      avatar: 'P',
      content: 'New stick day! Can\'t wait to test it out on the ice tonight.',
      hashtags: ['#newgear', '#hockeyequipment', '#excited'],
      likes: 156,
      comments: 24,
      liked: false,
      image: null,
      timestamp: '8 hours ago'
    },
    {
      id: 4,
      username: 'SlapshotQueen',
      avatar: 'S',
      content: 'Team practice was intense today. We\'re ready for the playoffs!',
      hashtags: ['#teamwork', '#playoffs', '#hockey'],
      likes: 203,
      comments: 31,
      liked: true,
      image: null,
      timestamp: '12 hours ago'
    },
    {
      id: 5,
      username: 'RinkRat',
      avatar: 'R',
      content: 'Just finished a 2-hour stickhandling session. Progress feels good!',
      hashtags: ['#training', '#stickhandling', '#progress'],
      likes: 67,
      comments: 8,
      liked: false,
      image: null,
      timestamp: '1 day ago'
    },
    {
      id: 6,
      username: 'GoalTender',
      avatar: 'G',
      content: 'Shutout game last night! Defense was on point. 🛡️',
      hashtags: ['#goalie', '#shutout', '#defense'],
      likes: 178,
      comments: 22,
      liked: false,
      image: null,
      timestamp: '1 day ago'
    }
  ]);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts.filter(post => {
      if (usernameFilter.trim() === '') return true;
      return post.username.toLowerCase().includes(usernameFilter.toLowerCase());
    });

    // Sort posts
    const sorted = [...filtered].sort((a, b) => {
      switch (sortFilter) {
        case 'most-recent':
          return b.id - a.id;
        case 'popularity':
          return b.likes - a.likes;
        case 'most-comments':
          return b.comments - a.comments;
        case 'oldest':
          return a.id - b.id;
        default:
          return 0;
      }
    });

    return sorted;
  }, [posts, usernameFilter, sortFilter]);

  const handleLike = (postId: number): void => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setNewPostImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (): void => {
    setImagePreview(null);
    setNewPostImage(null);
  };

  const handleCreatePost = (): void => {
    if (newPostContent.trim() || newPostImage) {
      const hashtags = newPostHashtags
        .split(' ')
        .filter(tag => tag.trim())
        .map(tag => tag.startsWith('#') ? tag : `#${tag}`);
      
      const newPost: Post = {
        id: posts.length + 1,
        username: 'You',
        avatar: 'Y',
        content: newPostContent || '',
        hashtags: hashtags,
        likes: 0,
        comments: 0,
        liked: false,
        image: newPostImage,
        timestamp: 'Just now'
      };
      
      setPosts([newPost, ...posts]);
      setNewPostContent('');
      setNewPostHashtags('');
      setNewPostImage(null);
      setImagePreview(null);
      setShowCreatePost(false);
    }
  };

  return (
    <div className="community-page">
      <Sidebar />
      <div className="main-content">
        <div className="top-bar">
          <h1 className="page-title">Affirmation</h1>
          <div className="top-bar-right">
            <button 
              className="create-post-button"
              onClick={() => setShowCreatePost(!showCreatePost)}
            >
              + Create Post
            </button>
            <button className="profile-button" onClick={() => router.push('/progress')}>
              Profile
            </button>
          </div>
        </div>

        <div className="community-content">
          {showCreatePost && (
            <div className="create-post-modal">
              <div className="create-post-card">
                <h2>Create New Post</h2>
                <textarea
                  placeholder="What's on your mind?"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="post-textarea"
                  rows={6}
                />
                {imagePreview && (
                  <div className="image-preview-container">
                    <img src={imagePreview} alt="Preview" className="image-preview" />
                    <button 
                      type="button"
                      className="remove-image-button"
                      onClick={handleRemoveImage}
                    >
                      ×
                    </button>
                  </div>
                )}
                <div className="image-upload-section">
                  <label htmlFor="image-upload" className="image-upload-button">
                    📷 Attach Image
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Hashtags (space separated)"
                  value={newPostHashtags}
                  onChange={(e) => setNewPostHashtags(e.target.value)}
                  className="hashtags-input"
                />
                <div className="create-post-actions">
                  <button 
                    className="cancel-button"
                    onClick={() => {
                      setShowCreatePost(false);
                      setNewPostContent('');
                      setNewPostHashtags('');
                      setNewPostImage(null);
                      setImagePreview(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    className="post-button"
                    onClick={handleCreatePost}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="filters-section">
            <h2 className="filters-title">Filters</h2>
            <div className="filters-inputs">
              <input
                type="text"
                placeholder="Filter by username"
                className="filter-input"
                value={usernameFilter}
                onChange={(e) => setUsernameFilter(e.target.value)}
              />
              <select
                className="filter-select"
                value={sortFilter}
                onChange={(e) => setSortFilter(e.target.value)}
              >
                <option value="most-recent">Most Recent</option>
                <option value="popularity">Popularity</option>
                <option value="most-comments">Most Comments</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>

          <div className="posts-feed">
            {filteredAndSortedPosts.map(post => (
              <div key={post.id} className="post-card">
                <div className="post-image">
                  {post.image ? (
                    <img src={post.image} alt="Post" className="post-image-content" />
                  ) : (
                    <div className="image-placeholder"></div>
                  )}
                </div>
                <div className="post-content">
                  <div className="post-header-section">
                    <div className="post-user-avatar-small"></div>
                    <div className="post-username">{post.username}</div>
                    <div className="post-hashtags-inline">
                      {post.hashtags.map((tag, index) => (
                        <span key={index} className="hashtag-inline">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="post-text-content">{post.content}</div>
                  <div className="post-actions-bottom">
                    <button
                      className={`action-button comment-button`}
                      onClick={() => {}}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.99 4c0-1.1-.89-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                      </svg>
                    </button>
                    <button
                      className={`action-button like-button ${post.liked ? 'liked' : ''}`}
                      onClick={() => handleLike(post.id)}
                    >
                      <svg viewBox="0 0 24 24" fill={post.liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;

