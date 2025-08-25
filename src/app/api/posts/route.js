import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://dummyjson.com/posts");
  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(request) {
  const body = await request.json();
  const res = await fetch("https://dummyjson.com/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data);
}