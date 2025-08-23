import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  posts: defineTable({
    title: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    tags: v.array(v.string()),
    authorId: v.id("users"),
    published: v.boolean(),
    views: v.number(),
    likes: v.number(),
  })
    .index("by_author", ["authorId"])
    .index("by_published", ["published"])
    .searchIndex("search_posts", {
      searchField: "title",
      filterFields: ["published", "authorId"],
    }),

  comments: defineTable({
    postId: v.id("posts"),
    authorId: v.id("users"),
    content: v.string(),
    parentId: v.optional(v.id("comments")),
  })
    .index("by_post", ["postId"])
    .index("by_author", ["authorId"])
    .index("by_parent", ["parentId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
