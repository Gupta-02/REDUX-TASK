export async function POST(request) {
  const { email, password } = await request.json();
  // Dummy authentication logic
  if (email === "test@example.com" && password === "password") {
    return new Response(
      JSON.stringify({ token: "dummy-token", user: { email } }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  return new Response(
    JSON.stringify({ error: "Invalid credentials" }),
    {
      status: 401,
      headers: { "Content-Type": "application/json" },
    }
  );
}