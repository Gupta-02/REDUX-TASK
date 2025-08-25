"use client";
import React, { useEffect, useState, Suspense } from "react";

export default function BlogsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("https://dummyjson.com/posts");
      const data = await res.json();
      setPosts(data.posts);
    }
    fetchPosts();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ul className="space-y-4">
          {posts.map(post => (
            <li key={post.id} className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </Suspense>
    </div>
  );
}