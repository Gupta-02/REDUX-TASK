import Navbar from '../../components/Navbar';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsRequest } from '../../store/slices/postsSlice';
import Loader from '../../components/Loader';
import Card from '../../components/Card';
import ItemList from '../../components/ItemList';

export default function BlogList() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector(state => state.posts);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    dispatch(fetchPostsRequest());
  }, [dispatch]);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div>
      <Head>
        <title>Blog - My Next.js Blog</title>
        <meta name="description" content="Blog list page for My Next.js Blog" />
      </Head>
      <Navbar />
      <h1>Blog Posts</h1>
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: '8px', marginBottom: '16px', width: '100%' }}
      />
      {loading && <Loader />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ItemList
        items={currentPosts}
        renderItem={post => (
          <Card title={post.title}>
            <Link href={`/blog/${post.id}`}>Read more</Link>
            <div style={{ marginTop: '8px', fontSize: '0.9em', color: '#666' }}>
              Category: {post.tags && post.tags.length ? post.tags.join(', ') : 'General'}
            </div>
          </Card>
        )}
      />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              margin: '0 4px',
              padding: '8px 12px',
              background: currentPage === i + 1 ? '#333' : '#eee',
              color: currentPage === i + 1 ? '#fff' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}