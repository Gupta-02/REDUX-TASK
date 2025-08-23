export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const response = await fetch(`https://dummyjson.com/posts/${id}`);
      const data = await response.json();
      
      if (response.ok) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    } catch (error) {
      console.error('Fetch post API error:', error);
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  } else if (req.method === 'PUT') {
    try {
      const response = await fetch(`https://dummyjson.com/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Update post API error:', error);
      res.status(500).json({ error: 'Failed to update post' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const response = await fetch(`https://dummyjson.com/posts/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Delete post API error:', error);
      res.status(500).json({ error: 'Failed to delete post' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
