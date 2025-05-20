import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BlogPost } from '../../types/blog';


interface StatsProps {
  user: { username: string } | null;
}

export function Post({ user }: StatsProps) {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/posts/${slug}`);
        if (!response.ok) {
          throw new Error('Post not found');
        }
        const data = await response.json();
        setPost(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError(`Unable to load blog post "${slug}". Please try again later.`);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <span>Loading...</span>;
  }

  if (error || !post) {
    return <span>{error}</span>;
  }

  const handleSubmitComment = async () => {
    console.log("Submitting comment:", comment);
    try {
      const response = await fetch(`http://localhost:8080/api/posts/${slug}/comments`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment }),
      });
      
      if (response.ok) {
        setComment('');
        alert('Comment submitted successfully!');
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert('Comment submission failed!');
    }
  }

  // const deletePost = async (slug: string) => {
  //   console.log("Deleting post with slug:", slug);
  //   try {
  //     const response = await fetch(`http://localhost:8080/api/posts/${slug}`, {
  //       method: "DELETE",
  //     });
      
  //     if (response.ok) {
  //       setDeletePostStatus("Post deleted successfully!");
  //       // Redirect to posts page after successful deletion
  //       setTimeout(() => {
  //         window.location.href = '/posts';
  //       }, 1500);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting post:", error);
  //     setDeletePostStatus("Post deletion failed!");
  //   }
  // }

  return (
    
    <div style={{ padding: 20 }}>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
      <p><strong>Author</strong>: {post.author.name} - {post.author.expertise}</p>
      <p><strong>Category</strong>: {post.category}</p>

      <p>Comment: </p>
      <p>{post.comment}</p>
      <input
        type="text"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />

      
      <button
        onClick={handleSubmitComment}
      >
        Submit
      </button>

      {/* {isUser && (
        <>
          <button
            onClick={() => deletePost(slug || '')}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Delete Post
          </button>
          {deletePostStatus && (
            <div style={{
              marginTop: '10px',
              padding: '8px',
              color: deletePostStatus.includes('failed') ? '#dc3545' : '#28a745',
              backgroundColor: deletePostStatus.includes('failed') ? '#f8d7da' : '#d4edda',
              borderRadius: '4px'
            }}>
              {deletePostStatus}
            </div>
          )}
        </>
      )} */}
    </div>
  );
}