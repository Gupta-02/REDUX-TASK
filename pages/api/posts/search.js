export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { q } = req.query;
    const response = await fetch(`https://dummyjson.com/posts/search?q=${encodeURIComponent(q)}`);
    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Search posts API error:', error);
    res.status(500).json({ error: 'Failed to search posts' });
  }
}
