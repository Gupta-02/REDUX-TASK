import Navbar from '../../components/Navbar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import Link from 'next/link';

export default function BlogDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [maxId, setMaxId] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`https://dummyjson.com/posts/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch post');
          return res.json();
        })
        .then(data => {
          setPost(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
      // Fetch max post id for navigation
      fetch('https://dummyjson.com/posts?limit=1&skip=0')
        .then(res => res.json())
        .then(data => {
          setMaxId(data.total);
        });
    }
  }, [id]);

  const prevId = id && Number(id) > 1 ? Number(id) - 1 : null;
  const nextId = id && maxId && Number(id) < maxId ? Number(id) + 1 : null;

  return (
    <div>
      <Head>
        <title>{post ? post.title : "Blog Detail"} - My Next.js Blog</title>
        <meta name="description" content={`Detail page for blog post ${id}`} />
      </Head>
      <Navbar />
      {loading && <Loader />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
            {prevId ? (
              <Link href={`/blog/${prevId}`}>
                <button style={{ padding: '8px 16px', borderRadius: '4px', background: '#eee', border: 'none', cursor: 'pointer' }}>
                  Previous Post
                </button>
              </Link>
            ) : <span />}
            {nextId ? (
              <Link href={`/blog/${nextId}`}>
                <button style={{ padding: '8px 16px', borderRadius: '4px', background: '#eee', border: 'none', cursor: 'pointer' }}>
                  Next Post
                </button>
              </Link>
            ) : <span />}
          </div>
        </>
      )}
    </div>
  );
}