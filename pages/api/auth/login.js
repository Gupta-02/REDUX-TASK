export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  try {
    // Forward request to DummyJSON API
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({
        success: true,
        user: data,
      });
    } else {
      res.status(401).json({
        success: false,
        error: data.message || 'Authentication failed',
      });
    }
  } catch (error) {
    console.error('Login API error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
