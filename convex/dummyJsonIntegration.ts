"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

// Fetch posts from DummyJSON API
export const fetchDummyPosts = action({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit || 30;
    
    try {
      const response = await fetch(`https://dummyjson.com/posts?limit=${limit}`);
      const data = await response.json();
      
      // Transform DummyJSON posts to our schema
      const transformedPosts = data.posts.map((post: any) => ({
        title: post.title,
        body: post.body,
        excerpt: post.body.substring(0, 200) + "...",
        tags: post.tags || ["general"],
        published: true,
        authorName: `User ${post.userId}`,
        views: Math.floor(Math.random() * 1000) + 50,
        reactions: {
          likes: post.reactions?.likes || Math.floor(Math.random() * 50),
          dislikes: post.reactions?.dislikes || Math.floor(Math.random() * 5),
        },
      }));
      
      return { success: true, posts: transformedPosts };
    } catch (error) {
      console.error("Failed to fetch from DummyJSON:", error);
      return { success: false, error: "Failed to fetch posts" };
    }
  },
});

// Authenticate with DummyJSON API
export const authenticateWithDummyJSON = action({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: args.username,
          password: args.password,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        return { 
          success: true, 
          user: {
            id: data.id,
            username: data.username,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            token: data.token,
          }
        };
      } else {
        return { success: false, error: data.message || "Authentication failed" };
      }
    } catch (error) {
      console.error("DummyJSON auth error:", error);
      return { success: false, error: "Authentication failed" };
    }
  },
});

// Seed database with DummyJSON data
export const seedWithDummyData = action({
  args: {},
  handler: async (ctx): Promise<any> => {
    try {
      // Fetch posts from DummyJSON directly
      const response = await fetch(`https://dummyjson.com/posts?limit=20`);
      const data = await response.json();
      
      const transformedPosts = data.posts.map((post: any) => ({
        title: post.title,
        body: post.body,
        excerpt: post.body.substring(0, 200) + "...",
        tags: post.tags || ["general"],
        published: true,
        authorName: `User ${post.userId}`,
        views: Math.floor(Math.random() * 1000) + 50,
        reactions: {
          likes: post.reactions?.likes || Math.floor(Math.random() * 50),
          dislikes: post.reactions?.dislikes || Math.floor(Math.random() * 5),
        },
      }));
      
      // Note: In a real implementation, you would insert these into your database
      // For now, we'll just return the data for display purposes
      return {
        success: true,
        message: "Successfully fetched dummy data",
        postsCount: transformedPosts.length,
        posts: transformedPosts.slice(0, 5), // Return first 5 for preview
      };
    } catch (error) {
      console.error("Seeding error:", error);
      return { success: false, error: "Failed to seed data" };
    }
  },
});
