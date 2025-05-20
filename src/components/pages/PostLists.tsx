import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types/blog';
import './PostLists.css';

export function PostLists() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [postCount, setPostCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchBy, setSearchBy] = useState('title');

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const url = searchTitle
          ? `http://localhost:8080/api/posts?${searchBy}=${encodeURIComponent(searchTitle)}`
          : 'http://localhost:8080/api/posts';
        
        const response = await fetch(url);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to fetch posts');
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimeout = setTimeout(() => {
      fetchPosts();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchTitle, searchBy]);

  const fetchPostCount = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/posts/count');
      const data = await response.json();
      setPostCount(data.count);
    } catch (error) {
      console.error('Error fetching post count:', error);
      setError('Failed to fetch post count');
    }
  };

  return (
    <div className="posts-container">
      <div className="header-container">
        <button
            className="count-button"
            onClick={fetchPostCount}
          >
            Show number of posts
          </button>
          {postCount !== null && (
            <div className="count-display">
              Total posts: {postCount}
            </div>
          )}
      </div>
      <div className="header-container">
        <input
          type="text"
          placeholder={`Search posts by ${searchBy}...`}
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="search-input"
        />
        <select onChange={(e) => setSearchBy(e.target.value)} >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="description">Description</option>
          <option value="category">Category</option>
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <ul className="posts-list">
          {posts.map((post) => (
            <li key={post.slug} className="post-item">
              <Link to={`/posts/${post.slug}`}>
                <h3>{post.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}