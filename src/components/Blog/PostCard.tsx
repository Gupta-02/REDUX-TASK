import { Link } from "react-router-dom";
import { Card } from "../UI/Card";
import { Button } from "../UI/Button";

interface PostCardProps {
  post: {
    _id: string;
    title: string;
    excerpt: string;
    authorName: string;
    tags: string[];
    reactions: { likes: number; dislikes: number };
    views: number;
    slug: string;
    _creationTime: number;
  };
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <Link to={`/blog/${post.slug}`}>
            <h3 className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors cursor-pointer">
              {post.title}
            </h3>
          </Link>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
            <span>By {post.authorName}</span>
            <span>•</span>
            <span>{new Date(post._creationTime).toLocaleDateString()}</span>
            <span>•</span>
            <span>{post.views} views</span>
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>❤️ {post.reactions.likes}</span>
            <span>👁️ {post.views}</span>
          </div>
          <Link to={`/blog/${post.slug}`}>
            <Button variant="outline" size="sm">
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
