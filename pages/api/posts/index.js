export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { skip = 0, limit = 10 } = req.query;
      const response = await fetch(`https://dummyjson.com/posts?skip=${skip}&limit=${limit}`);
      const data = await response.json();
      
      res.status(200).json(data);
    } catch (error) {
      console.error('Fetch posts API error:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  } else if (req.method === 'POST') {
    try {
      const response = await fetch('https://dummyjson.com/posts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      
      const data = await response.json();
      res.status(201).json(data);
    } catch (error) {
      console.error('Create post API error:', error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
