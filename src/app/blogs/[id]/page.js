"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

export default function BlogDetailPage() {
  const { id } = useParams();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const post = posts.find((p) => p.id === parseInt(id));
  if (loading) return <div className="max-w-2xl mx-auto py-8"><p>Loading...</p></div>;
  if (error) return <div className="max-w-2xl mx-auto py-8"><p className="text-red-500">{error}</p></div>;
  if (!post) return <div className="max-w-2xl mx-auto py-8"><h1>Blog not found</h1></div>;
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      <p className="text-gray-700">{post.body}</p>
    </div>
  );
}