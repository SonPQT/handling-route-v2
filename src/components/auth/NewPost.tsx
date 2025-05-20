import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface NewPostProps {
  user: { username: string } | null;
}

export function NewPost({ user }: NewPostProps) {
  const [newPost, setNewPost] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const onSubmit = async (data: any) => {
    const post = JSON.stringify(data);
    try {
      const response = await fetch("http://localhost:8080/api/posts", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: post,
      });
      
      if (response.ok) {
        setNewPost("Post created successfully!");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setNewPost("Post creation failed!");
    }
  };


  return (
    <div style={{ padding: 20 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ padding: 10 }}>
          <br />
          <span>Slug:</span><br />
          <input type="text" {...register("slug", { required: true })} /><br />
          {errors.slug && <div style={{ color: "red" }}>Slug is required</div>}
          
          <span>Title:</span><br />
          <input type="text" {...register("title", { required: true })} /><br />
          {errors.title && <div style={{ color: "red" }}>Title is required</div>}
          
          <span>Description:</span><br />
          <input type="text" {...register("description", { required: true })} />

          <select {...register("category", { required: true })}>
            <option value="technology">Technology</option>
            <option value="health">Health</option>
            <option value="lifestyle">Lifestyle</option>
          </select>


          <br />
          {errors.description && <div style={{ color: "red" }}>Description is required</div>}
          
          <br/><button type="submit">Add New</button>
          <p className="text-success">{newPost}</p>
        </div>
      </form>
    </div>
  );
}