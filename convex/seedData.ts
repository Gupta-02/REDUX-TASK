import { mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const seedPosts = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if posts already exist
    const existingPosts = await ctx.db.query("posts").collect();
    if (existingPosts.length > 0) {
      return "Posts already exist";
    }

    // Get the current authenticated user
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to seed posts");
    }
    const samplePosts = [
      {
        title: "Getting Started with React",
        content: "React is a powerful JavaScript library for building user interfaces. In this comprehensive guide, we'll explore the fundamentals of React and how to get started with your first application.",
        authorId: userId,
        views: 245,
        likes: 18,
        excerpt: "Learn the basics of React and start building modern web applications.",
        tags: ["react", "javascript", "frontend"],
        published: true,
      },
      {
        title: "Understanding Redux State Management",
        content: "Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments, and are easy to test.",
        authorId: userId,
        views: 189,
        likes: 23,
        excerpt: "Master Redux for better state management in your applications.",
        tags: ["redux", "state-management", "javascript"],
        published: true,
      },
      {
        title: "Next.js: The React Framework",
        content: "Next.js is a React framework that gives you building blocks to create web applications. By framework, we mean Next.js handles the tooling and configuration needed for React.",
        authorId: userId,
        views: 156,
        likes: 31,
        excerpt: "Discover the power of Next.js for full-stack React applications.",
        tags: ["nextjs", "react", "fullstack"],
        published: true,
      },
    ];

    // Insert sample posts
    for (const post of samplePosts) {
      await ctx.db.insert("posts", post);
    }

    return `Successfully seeded ${samplePosts.length} posts`;
  },
});
