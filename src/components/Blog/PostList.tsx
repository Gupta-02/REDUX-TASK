import { PostCard } from "./PostCard";
import { Loader } from "../UI/Loader";

interface PostListProps {
  posts: Array<{
    _id: string;
    title: string;
    excerpt: string;
    authorName: string;
    tags: string[];
    reactions: { likes: number; dislikes: number };
    views: number;
    slug: string;
    _creationTime: number;
  }>;
  loading?: boolean;
}

export function PostList({ posts, loading }: PostListProps) {
  if (loading) {
    return <Loader size="lg" className="py-12" />;
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No posts found
        </h3>
        <p className="text-gray-600">
          Be the first to share your thoughts with the community!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
