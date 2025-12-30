import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { name: string } }
) {
  const name = params.name;
  const API_BASE = "https://d3ed3fpdxc3p43.cloudfront.net";
  const SECRET = "Sl5xxH8p7aehURuzxJzylQ8gDmHT5dWL"; // Extracted from source

  try {
    const response = await fetch(`${API_BASE}/api/composite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-secret": SECRET,
      },
      body: JSON.stringify({ Name: name, locale: "en" }), // locale "en" from source
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}