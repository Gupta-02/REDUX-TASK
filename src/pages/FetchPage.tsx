import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/UI/Card";
import { Button } from "../components/UI/Button";

interface DummyPost {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions?: { likes: number; dislikes: number } | { likes?: number } | null;
  views?: number;
}

export default function FetchPage() {
  const [posts, setPosts] = useState<DummyPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const fetchPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("https://dummyjson.com/posts");
        if (!res.ok) throw new Error(`Network error: ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          if (data && Array.isArray(data.posts)) {
            const mapped: DummyPost[] = data.posts.map((p: any) => ({
              id: p.id,
              title: p.title,
              body: p.body,
              userId: p.userId,
              tags: p.tags || [],
              reactions: p.reactions || { likes: 0 },
              views: p.views ?? Math.floor(Math.random() * 1000),
            }));
            setPosts(mapped);
          } else {
            setError("Unexpected response format");
          }
        }
      } catch (err: any) {
        if (!cancelled) setError(err.message || "Failed to fetch posts");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPosts();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Fetched Posts</h1>
        <div className="flex gap-3">
          <Link to="/">
            <Button variant="outline">Home</Button>
          </Link>
          <Link to="/blog">
            <Button variant="outline">Blog</Button>
          </Link>
        </div>
      </div>

      {error && (
        <div className="text-red-600 p-4 bg-red-50 rounded mb-6">{error}</div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-3 bg-gray-200 rounded w-full mb-2" />
              <div className="h-3 bg-gray-200 rounded w-2/3 mb-4" />
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded-full w-16" />
                <div className="h-6 bg-gray-200 rounded-full w-20" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                    <span>By User {post.userId}</span>
                    <span>•</span>
                    <span>{(post as any).reactions?.likes || 0} likes</span>
                    <span>•</span>
                    <span>{post.views || Math.floor(Math.random() * 1000)} views</span>
                  </div>
                </div>
                <p className="text-gray-600 line-clamp-3">{post.body.substring(0, 150)}...</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>❤️ {(post as any).reactions?.likes || 0}</span>
                    <span>👁️ {post.views || Math.floor(Math.random() * 1000)}</span>
                  </div>
                  <Link to={`/blog/${post.id}`}>
                    <Button variant="outline" size="sm">Read More</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
