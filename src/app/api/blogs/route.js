export async function GET() {
  // Dummy blog data
  const blogs = [
    { id: 1, title: "First Blog", content: "This is the first blog post." },
    { id: 2, title: "Second Blog", content: "This is the second blog post." },
  ];
  return new Response(JSON.stringify(blogs), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const body = await request.json();
  // Here you would add logic to save the blog post
  return new Response(JSON.stringify({ message: "Blog created", blog: body }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}