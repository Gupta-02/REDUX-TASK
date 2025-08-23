import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// Get comments for a post
export const getPostComments = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .order("asc")
      .collect();

    return Promise.all(
      comments.map(async (comment) => {
        const author = await ctx.db.get(comment.authorId);
        return {
          ...comment,
          author: author ? { name: author.name, email: author.email } : null,
        };
      })
    );
  },
});

// Add a comment to a post
export const addComment = mutation({
  args: {
    postId: v.id("posts"),
    content: v.string(),
    parentId: v.optional(v.id("comments")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to comment");
    }

    return await ctx.db.insert("comments", {
      ...args,
      authorId: userId,
    });
  },
});

// Delete a comment
export const deleteComment = mutation({
  args: { id: v.id("comments") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to delete a comment");
    }

    const comment = await ctx.db.get(args.id);
    if (!comment) {
      throw new Error("Comment not found");
    }

    if (comment.authorId !== userId) {
      throw new Error("You can only delete your own comments");
    }

    await ctx.db.delete(args.id);
  },
});
