import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { api } from "./_generated/api";

// Get all published posts
export const getAllPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_published", (q) => q.eq("published", true))
      .order("desc")
      .collect();

    return Promise.all(
      posts.map(async (post) => {
        const author = await ctx.db.get(post.authorId);
        return {
          ...post,
          author: author ? { name: author.name, email: author.email } : null,
        };
      })
    );
  },
});

// Get a single post by ID
export const getPost = query({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id);
    if (!post) return null;

    const author = await ctx.db.get(post.authorId);
    return {
      ...post,
      author: author ? { name: author.name, email: author.email } : null,
    };
  },
});

// Get posts by current user
export const getUserPosts = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    return await ctx.db
      .query("posts")
      .withIndex("by_author", (q) => q.eq("authorId", userId))
      .order("desc")
      .collect();
  },
});

// Search posts
export const searchPosts = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    if (!args.query.trim()) {
      const posts = await ctx.db
        .query("posts")
        .withIndex("by_published", (q) => q.eq("published", true))
        .order("desc")
        .collect();

      return Promise.all(
        posts.map(async (post) => {
          const author = await ctx.db.get(post.authorId);
          return {
            ...post,
            author: author ? { name: author.name, email: author.email } : null,
          };
        })
      );
    }

    const posts = await ctx.db
      .query("posts")
      .withSearchIndex("search_posts", (q) =>
        q.search("title", args.query).eq("published", true)
      )
      .collect();

    return Promise.all(
      posts.map(async (post) => {
        const author = await ctx.db.get(post.authorId);
        return {
          ...post,
          author: author ? { name: author.name, email: author.email } : null,
        };
      })
    );
  },
});

// Create a new post
export const createPost = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    tags: v.array(v.string()),
    published: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to create a post");
    }

    return await ctx.db.insert("posts", {
      ...args,
      authorId: userId,
      views: 0,
      likes: 0,
    });
  },
});

// Update a post
export const updatePost = mutation({
  args: {
    id: v.id("posts"),
    title: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    tags: v.array(v.string()),
    published: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to update a post");
    }

    const post = await ctx.db.get(args.id);
    if (!post) {
      throw new Error("Post not found");
    }

    if (post.authorId !== userId) {
      throw new Error("You can only update your own posts");
    }

    const { id, ...updateData } = args;
    await ctx.db.patch(id, updateData);
  },
});

// Delete a post
export const deletePost = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to delete a post");
    }

    const post = await ctx.db.get(args.id);
    if (!post) {
      throw new Error("Post not found");
    }

    if (post.authorId !== userId) {
      throw new Error("You can only delete your own posts");
    }

    await ctx.db.delete(args.id);
  },
});

// Increment post views
export const incrementViews = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id);
    if (!post) return;

    await ctx.db.patch(args.id, {
      views: post.views + 1,
    });
  },
});

// Toggle post like
export const toggleLike = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to like a post");
    }

    const post = await ctx.db.get(args.id);
    if (!post) {
      throw new Error("Post not found");
    }

    // For simplicity, just increment likes
    // In a real app, you'd track which users liked which posts
    await ctx.db.patch(args.id, {
      likes: post.likes + 1,
    });
  },
});
